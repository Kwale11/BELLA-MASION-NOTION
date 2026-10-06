import {
    Suspense,
    useEffect,
    useState,
} from "react";

import {
    Canvas,
} from "@react-three/fiber";

import {
    Bounds,
    ContactShadows,
    OrbitControls,
    useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import "./GlbViewerPage.css";


interface GlbModelProps {
    url: string;
}


function GlbModel({
                      url,
                  }: GlbModelProps) {

    const {
        scene,
    } = useGLTF(url);


    useEffect(() => {

        const materials:
            THREE.Material[] = [];

        scene.traverse((object) => {

            if (
                !(object instanceof THREE.Mesh)
            ) {
                return;
            }

            const material =
                new THREE.MeshStandardMaterial({
                    color: "#b8b8b8",

                    // 금속 재질 제거
                    metalness: 0,

                    // 광택 제거
                    roughness: 1,

                    // 앞/뒤 모두 표시
                    side: THREE.DoubleSide,
                });


            materials.push(material);

            object.material =
                material;

            object.castShadow =
                true;

            object.receiveShadow =
                true;
        });


        return () => {
            materials.forEach(
                (material) => {
                    material.dispose();
                },
            );
        };

    }, [scene]);


    return (
        <primitive
            object={scene}
        />
    );
}


export default function GlbViewerPage() {

    const [
        modelUrl,
        setModelUrl,
    ] = useState<string | null>(
        null,
    );


    const [
        fileName,
        setFileName,
    ] = useState("");


    const handleFileChange = (
        event:
        React.ChangeEvent<HTMLInputElement>,
    ) => {

        const file =
            event.target.files?.[0];


        if (!file) {
            return;
        }


        if (
            !file.name
                .toLowerCase()
                .endsWith(".glb")
        ) {

            alert(
                "GLB 파일만 선택해주세요.",
            );

            event.target.value = "";

            return;
        }


        const url =
            URL.createObjectURL(
                file,
            );


        setModelUrl(
            (previousUrl) => {

                if (previousUrl) {
                    URL.revokeObjectURL(
                        previousUrl,
                    );
                }

                return url;
            },
        );


        setFileName(
            file.name,
        );


        event.target.value = "";
    };


    const handleReset = () => {

        setModelUrl(
            (previousUrl) => {

                if (previousUrl) {
                    URL.revokeObjectURL(
                        previousUrl,
                    );
                }

                return null;
            },
        );


        setFileName("");
    };


    useEffect(() => {

        return () => {

            if (modelUrl) {
                URL.revokeObjectURL(
                    modelUrl,
                );
            }

        };

    }, [modelUrl]);


    return (
        <main className="glb-viewer-page">

            {/* ============================= */}
            {/* Header                        */}
            {/* ============================= */}

            <section
                className={
                    "glb-viewer-page__header"
                }
            >

                <div>

                    <p
                        className={
                            "glb-viewer-page__eyebrow"
                        }
                    >
                        3D MODEL VIEWER
                    </p>


                    <h1>
                        GLB Viewer
                    </h1>


                    <p
                        className={
                            "glb-viewer-page__description"
                        }
                    >
                        GLB 모델의 재질과
                        광택을 제거하고
                        기본 Clay 재질로
                        폴리곤 형태를 확인합니다.
                    </p>

                </div>


                <div
                    className={
                        "glb-viewer-page__actions"
                    }
                >

                    <label
                        className={
                            "glb-viewer-page__upload-button"
                        }
                    >
                        GLB 선택

                        <input
                            type="file"
                            accept=".glb,model/gltf-binary"
                            onChange={
                                handleFileChange
                            }
                        />

                    </label>


                    {modelUrl && (

                        <button
                            type="button"
                            className={
                                "glb-viewer-page__reset-button"
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
                    "glb-viewer-page__viewer"
                }
            >

                {modelUrl ? (

                    <>

                        <div
                            className={
                                "glb-viewer-page__file-info"
                            }
                        >
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

                            {/* 배경 */}

                            <color
                                attach="background"
                                args={[
                                    "#e8e8e8",
                                ]}
                            />


                            {/* ===================== */}
                            {/* 기본 조명             */}
                            {/* ===================== */}

                            <ambientLight
                                intensity={
                                    1.2
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
                                    2
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


                            {/* ===================== */}
                            {/* GLB Model             */}
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

                                    <GlbModel
                                        url={
                                            modelUrl
                                        }
                                    />

                                </Bounds>

                            </Suspense>


                            {/* ===================== */}
                            {/* 바닥 그림자           */}
                            {/* ===================== */}

                            <ContactShadows
                                position={[
                                    0,
                                    -1.5,
                                    0,
                                ]}
                                opacity={
                                    0.22
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
                            {/* Camera Controls       */}
                            {/* ===================== */}

                            <OrbitControls
                                makeDefault
                                enableDamping
                                dampingFactor={
                                    0.08
                                }
                            />

                        </Canvas>


                        <div
                            className={
                                "glb-viewer-page__help"
                            }
                        >
                            Drag · Rotate
                            &nbsp;&nbsp;/&nbsp;&nbsp;
                            Wheel · Zoom
                        </div>

                    </>

                ) : (

                    <label
                        className={
                            "glb-viewer-page__empty"
                        }
                    >

                        <span
                            className={
                                "glb-viewer-page__empty-icon"
                            }
                        >
                            3D
                        </span>


                        <strong>
                            GLB 파일을 선택하세요
                        </strong>


                        <span>
                            원본 재질을 제거하고
                            Clay 재질로 표시합니다.
                        </span>


                        <input
                            type="file"
                            accept=".glb,model/gltf-binary"
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