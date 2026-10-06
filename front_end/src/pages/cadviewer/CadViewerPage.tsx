import {
    Suspense,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Canvas,
} from "@react-three/fiber";

import {
    Bounds,
    ContactShadows,
    OrbitControls,
} from "@react-three/drei";

import * as THREE from "three";

import occtImportJs from "occt-import-js";

import "./CadViewerPage.css";


/* ======================================== */
/* Types                                    */
/* ======================================== */

type CadFileType =
    | "step"
    | "iges"
    | "brep";


interface OcctAttribute {
    array: number[] | number[][];
}


interface OcctIndex {
    array: number[] | number[][];
}


interface OcctMesh {
    name?: string;

    attributes: {
        position: OcctAttribute;
        normal?: OcctAttribute;
    };

    index?: OcctIndex;
}


interface OcctResult {
    success: boolean;
    meshes?: OcctMesh[];
}


interface OcctModule {
    ReadStepFile: (
        content: Uint8Array,
        params: unknown,
    ) => OcctResult;

    ReadIgesFile: (
        content: Uint8Array,
        params: unknown,
    ) => OcctResult;

    ReadBrepFile: (
        content: Uint8Array,
        params: unknown,
    ) => OcctResult;
}


/* ======================================== */
/* Utility                                  */
/* ======================================== */

function flattenNumberArray(
    values:
        | number[]
        | number[][],
): number[] {

    return values.flat(
        Infinity,
    ) as number[];
}


function getCadFileType(
    fileName: string,
): CadFileType | null {

    const extension =
        fileName
            .split(".")
            .pop()
            ?.toLowerCase();


    if (
        extension === "step"
        || extension === "stp"
    ) {
        return "step";
    }


    if (
        extension === "iges"
        || extension === "igs"
    ) {
        return "iges";
    }


    if (
        extension === "brep"
    ) {
        return "brep";
    }


    return null;
}


/* ======================================== */
/* CAD → Three.js                           */
/* ======================================== */

function createCadGroup(
    result: OcctResult,
): THREE.Group {

    const group =
        new THREE.Group();


    if (
        !result.meshes
        || result.meshes.length === 0
    ) {
        return group;
    }


    result.meshes.forEach(
        (
            meshData,
            index,
        ) => {

            const geometry =
                new THREE.BufferGeometry();


            /* ================================= */
            /* Position                          */
            /* ================================= */

            const positionArray =
                flattenNumberArray(
                    meshData
                        .attributes
                        .position
                        .array,
                );


            geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(
                    positionArray,
                    3,
                ),
            );


            /* ================================= */
            /* Normal                            */
            /* ================================= */

            const normalData =
                meshData
                    .attributes
                    .normal;


            if (normalData) {

                const normalArray =
                    flattenNumberArray(
                        normalData.array,
                    );


                geometry.setAttribute(
                    "normal",
                    new THREE.Float32BufferAttribute(
                        normalArray,
                        3,
                    ),
                );

            } else {

                geometry.computeVertexNormals();
            }


            /* ================================= */
            /* Index                             */
            /* ================================= */

            if (meshData.index) {

                const indexArray =
                    flattenNumberArray(
                        meshData
                            .index
                            .array,
                    );


                geometry.setIndex(
                    indexArray,
                );
            }


            geometry.computeBoundingBox();
            geometry.computeBoundingSphere();


            /* ================================= */
            /* Clay material                     */
            /* ================================= */

            const material =
                new THREE.MeshStandardMaterial({
                    color: "#b9b9b9",

                    metalness: 0,

                    roughness: 0.82,

                    side:
                    THREE.DoubleSide,
                });


            const mesh =
                new THREE.Mesh(
                    geometry,
                    material,
                );


            mesh.name =
                meshData.name
                ?? `CAD Mesh ${index + 1}`;


            mesh.castShadow =
                true;

            mesh.receiveShadow =
                true;


            group.add(
                mesh,
            );

        },
    );


    return group;
}


/* ======================================== */
/* CAD Model                                */
/* ======================================== */

interface CadModelProps {
    object: THREE.Group;
}


function CadModel({
                      object,
                  }: CadModelProps) {

    return (
        <primitive
            object={object}
        />
    );
}


/* ======================================== */
/* Component                                */
/* ======================================== */

export default function CadViewerPage() {

    const [
        cadObject,
        setCadObject,
    ] = useState<THREE.Group | null>(
        null,
    );


    const [
        fileName,
        setFileName,
    ] = useState("");


    const [
        fileType,
        setFileType,
    ] = useState<CadFileType | null>(
        null,
    );


    const [
        isLoading,
        setIsLoading,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState("");


    /* ======================================== */
    /* Dispose CAD Model                        */
    /* ======================================== */

    const disposeCadObject = (
        object: THREE.Group | null,
    ) => {

        if (!object) {
            return;
        }


        object.traverse(
            (child) => {

                if (
                    !(child instanceof THREE.Mesh)
                ) {
                    return;
                }


                child.geometry.dispose();


                if (
                    Array.isArray(
                        child.material,
                    )
                ) {

                    child.material.forEach(
                        (material) => {
                            material.dispose();
                        },
                    );

                } else {

                    child.material.dispose();
                }

            },
        );
    };


    /* ======================================== */
    /* File Change                              */
    /* ======================================== */

    const handleFileChange = async (
        event:
        React.ChangeEvent<HTMLInputElement>,
    ) => {

        const file =
            event.target.files?.[0];


        event.target.value = "";


        if (!file) {
            return;
        }


        const detectedFileType =
            getCadFileType(
                file.name,
            );


        if (!detectedFileType) {

            alert(
                "STEP, STP, IGES, IGS, BREP 파일만 선택해주세요.",
            );

            return;
        }


        setIsLoading(true);

        setError("");


        try {

            /* ================================= */
            /* Read CAD binary                   */
            /* ================================= */

            const arrayBuffer =
                await file.arrayBuffer();


            const fileBuffer =
                new Uint8Array(
                    arrayBuffer,
                );


            /* ================================= */
            /* OpenCascade WASM                  */
            /* ================================= */

            const occt =
                await occtImportJs({
                    locateFile: (
                        path: string,
                    ) => {

                        if (
                            path.endsWith(
                                ".wasm",
                            )
                        ) {
                            return "/occt-import-js.wasm";
                        }

                        return path;
                    },
                }) as OcctModule;


            /* ================================= */
            /* Tessellation Settings             */
            /* ================================= */

            const params = {
                linearUnit:
                    "millimeter",

                linearDeflectionType:
                    "bounding_box_ratio",

                /*
                 * 값이 작을수록
                 * CAD 곡면이 더 세밀하게
                 * 삼각형 메시로 변환됩니다.
                 */
                linearDeflection:
                    0.001,

                /*
                 * 곡면 각도 오차
                 */
                angularDeflection:
                    0.15,
            };


            let result:
                OcctResult;


            /* ================================= */
            /* Parse CAD                         */
            /* ================================= */

            switch (
                detectedFileType
                ) {

                case "step":

                    result =
                        occt.ReadStepFile(
                            fileBuffer,
                            params,
                        );

                    break;


                case "iges":

                    result =
                        occt.ReadIgesFile(
                            fileBuffer,
                            params,
                        );

                    break;


                case "brep":

                    result =
                        occt.ReadBrepFile(
                            fileBuffer,
                            params,
                        );

                    break;


                default:

                    throw new Error(
                        "지원하지 않는 CAD 형식입니다.",
                    );
            }


            if (
                !result.success
            ) {

                throw new Error(
                    "CAD 파일을 변환하지 못했습니다.",
                );
            }


            /* ================================= */
            /* Three.js Group                    */
            /* ================================= */

            const newObject =
                createCadGroup(
                    result,
                );


            if (
                newObject.children.length === 0
            ) {

                throw new Error(
                    "CAD 모델에서 표시할 Mesh를 찾지 못했습니다.",
                );
            }


            setCadObject(
                (
                    previousObject,
                ) => {

                    disposeCadObject(
                        previousObject,
                    );


                    return newObject;
                },
            );


            setFileName(
                file.name,
            );


            setFileType(
                detectedFileType,
            );

        } catch (
            caughtError
            ) {

            console.error(
                caughtError,
            );


            const message =
                caughtError
                instanceof Error
                    ? caughtError.message
                    : "CAD 파일을 불러오는 중 오류가 발생했습니다.";


            setError(
                message,
            );

        } finally {

            setIsLoading(false);
        }

    };


    /* ======================================== */
    /* Reset                                    */
    /* ======================================== */

    const handleReset = () => {

        setCadObject(
            (
                previousObject,
            ) => {

                disposeCadObject(
                    previousObject,
                );


                return null;
            },
        );


        setFileName("");

        setFileType(null);

        setError("");
    };


    /* ======================================== */
    /* Cleanup                                  */
    /* ======================================== */

    useEffect(() => {

        return () => {

            disposeCadObject(
                cadObject,
            );
        };

    }, [
        cadObject,
    ]);


    /* ======================================== */
    /* File Type Label                          */
    /* ======================================== */

    const fileTypeLabel =
        useMemo(
            () => {

                if (!fileType) {
                    return "";
                }


                switch (
                    fileType
                    ) {

                    case "step":
                        return "STEP";

                    case "iges":
                        return "IGES";

                    case "brep":
                        return "BREP";

                    default:
                        return "";
                }

            },
            [
                fileType,
            ],
        );


    return (
        <main className="cad-viewer-page">

            {/* ============================= */}
            {/* Header                        */}
            {/* ============================= */}

            <section
                className={
                    "cad-viewer-page__header"
                }
            >

                <div>

                    <p
                        className={
                            "cad-viewer-page__eyebrow"
                        }
                    >
                        CAD MODEL VIEWER
                    </p>


                    <h1>
                        CAD Viewer
                    </h1>


                    <p
                        className={
                            "cad-viewer-page__description"
                        }
                    >
                        STEP · STP · IGES · IGS · BREP
                        CAD 모델을 브라우저에서
                        삼각형 Mesh로 변환하여 확인합니다.
                        원본 CAD 재질 대신 Clay 재질로
                        형상과 곡면 디테일을 표시합니다.
                    </p>

                </div>


                <div
                    className={
                        "cad-viewer-page__actions"
                    }
                >

                    <label
                        className={
                            "cad-viewer-page__upload-button"
                        }
                    >

                        CAD 선택

                        <input
                            type="file"
                            accept={
                                ".step,.stp,.iges,.igs,.brep"
                            }
                            onChange={
                                handleFileChange
                            }
                        />

                    </label>


                    {cadObject && (

                        <button
                            type="button"
                            className={
                                "cad-viewer-page__reset-button"
                            }
                            onClick={
                                handleReset
                            }
                        >
                            제거
                        </button>

                    )}

                </div>

            </section>


            {/* ============================= */}
            {/* Viewer                        */}
            {/* ============================= */}

            <section
                className={
                    "cad-viewer-page__viewer"
                }
            >

                {/* ========================= */}
                {/* Loading                   */}
                {/* ========================= */}

                {isLoading && (

                    <div
                        className={
                            "cad-viewer-page__loading"
                        }
                    >

                        <div
                            className={
                                "cad-viewer-page__spinner"
                            }
                        />

                        <strong>
                            CAD 모델 변환 중
                        </strong>

                        <span>
                            OpenCascade로
                            CAD 곡면을 Mesh로 변환하고 있습니다.
                        </span>

                    </div>

                )}


                {/* ========================= */}
                {/* Error                     */}
                {/* ========================= */}

                {!isLoading && error && (

                    <div
                        className={
                            "cad-viewer-page__error"
                        }
                    >

                        <strong>
                            CAD 파일을 불러오지 못했습니다.
                        </strong>

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                {/* ========================= */}
                {/* CAD Canvas                */}
                {/* ========================= */}

                {!isLoading
                    && !error
                    && cadObject
                    && (

                        <>

                            <div
                                className={
                                    "cad-viewer-page__file-info"
                                }
                            >

                            <span>
                                {fileTypeLabel}
                            </span>

                                <span
                                    className={
                                        "cad-viewer-page__file-divider"
                                    }
                                />

                                {fileName}

                            </div>


                            <Canvas
                                shadows
                                camera={{
                                    position: [
                                        4,
                                        2.5,
                                        5,
                                    ],
                                    fov: 40,
                                }}
                            >

                                {/* ===================== */}
                                {/* Background            */}
                                {/* ===================== */}

                                <color
                                    attach="background"
                                    args={[
                                        "#e8e8e8",
                                    ]}
                                />


                                {/* ===================== */}
                                {/* Lights                */}
                                {/* ===================== */}

                                <ambientLight
                                    intensity={
                                        1.15
                                    }
                                />


                                <directionalLight
                                    castShadow
                                    position={[
                                        5,
                                        6,
                                        5,
                                    ]}
                                    intensity={
                                        2.2
                                    }
                                />


                                <directionalLight
                                    position={[
                                        -4,
                                        2,
                                        -3,
                                    ]}
                                    intensity={
                                        0.7
                                    }
                                />


                                <directionalLight
                                    position={[
                                        0,
                                        -3,
                                        4,
                                    ]}
                                    intensity={
                                        0.4
                                    }
                                />


                                {/* ===================== */}
                                {/* CAD Model             */}
                                {/* ===================== */}

                                <Suspense
                                    fallback={
                                        null
                                    }
                                >

                                    <Bounds
                                        fit
                                        clip
                                        observe
                                        margin={
                                            1.25
                                        }
                                    >

                                        <CadModel
                                            object={
                                                cadObject
                                            }
                                        />

                                    </Bounds>

                                </Suspense>


                                {/* ===================== */}
                                {/* Shadow                */}
                                {/* ===================== */}

                                <ContactShadows
                                    position={[
                                        0,
                                        -1.5,
                                        0,
                                    ]}
                                    opacity={
                                        0.2
                                    }
                                    scale={
                                        10
                                    }
                                    blur={
                                        2.5
                                    }
                                    far={
                                        5
                                    }
                                />


                                {/* ===================== */}
                                {/* Controls              */}
                                {/* ===================== */}

                                <OrbitControls
                                    makeDefault
                                    enableDamping
                                    dampingFactor={
                                        0.08
                                    }
                                    enablePan
                                    enableZoom
                                    enableRotate
                                />

                            </Canvas>


                            <div
                                className={
                                    "cad-viewer-page__help"
                                }
                            >
                                Drag · Rotate
                                &nbsp;&nbsp;/&nbsp;&nbsp;
                                Wheel · Zoom
                                &nbsp;&nbsp;/&nbsp;&nbsp;
                                Right Drag · Pan
                            </div>

                        </>

                    )}


                {/* ========================= */}
                {/* Empty                     */}
                {/* ========================= */}

                {!isLoading
                    && !error
                    && !cadObject
                    && (

                        <label
                            className={
                                "cad-viewer-page__empty"
                            }
                        >

                        <span
                            className={
                                "cad-viewer-page__empty-icon"
                            }
                        >
                            CAD
                        </span>


                            <strong>
                                CAD 파일을 선택하세요
                            </strong>


                            <span>
                            STEP · STP · IGES · IGS · BREP
                        </span>


                            <input
                                type="file"
                                accept={
                                    ".step,.stp,.iges,.igs,.brep"
                                }
                                onChange={
                                    handleFileChange
                                }
                            />

                        </label>

                    )}

            </section>

        </main>
    );
}