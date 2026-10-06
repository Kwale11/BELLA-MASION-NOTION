import {
    useEffect,
    useMemo,
} from "react";

import {
    Center,
    useGLTF,
    useTexture,
} from "@react-three/drei";

import * as THREE from "three";

import type {
    CustomizationSelections,
} from "../../types/customization";

import {
    getFinishProfile,
    getFinishTextureUrls,
    getMetalColor,
    getRingModelUrl,
    getRingSizeScale,
} from "./ringRendering";

interface CustomRingModelProps {
    selections: CustomizationSelections;
}

/*
 * GLB에 UV가 없으므로 반지 형태에 맞는 UV를 생성합니다.
 * 생성된 UV는 헤어라인, 무광, 해머드 등의 normalMap에 사용됩니다.
 */
function createRingUv(
    geometry: THREE.BufferGeometry,
) {
    if (geometry.getAttribute("uv")) {
        return;
    }

    const position =
        geometry.getAttribute("position");

    if (!position) {
        return;
    }

    let minimumRadius = Infinity;
    let maximumRadius = -Infinity;

    for (
        let index = 0;
        index < position.count;
        index += 1
    ) {
        const x = position.getX(index);
        const y = position.getY(index);

        const radius = Math.sqrt(
            x * x + y * y,
        );

        minimumRadius = Math.min(
            minimumRadius,
            radius,
        );

        maximumRadius = Math.max(
            maximumRadius,
            radius,
        );
    }

    const centerRadius =
        (minimumRadius + maximumRadius) / 2;

    const uvValues =
        new Float32Array(
            position.count * 2,
        );

    for (
        let index = 0;
        index < position.count;
        index += 1
    ) {
        const x = position.getX(index);
        const y = position.getY(index);
        const z = position.getZ(index);

        const radius = Math.sqrt(
            x * x + y * y,
        );

        const aroundRing =
            Math.atan2(y, x);

        const aroundSurface =
            Math.atan2(
                z,
                radius - centerRadius,
            );

        uvValues[index * 2] =
            (aroundRing + Math.PI) /
            (Math.PI * 2);

        uvValues[index * 2 + 1] =
            (aroundSurface + Math.PI) /
            (Math.PI * 2);
    }

    geometry.setAttribute(
        "uv",
        new THREE.BufferAttribute(
            uvValues,
            2,
        ),
    );
}

function prepareGeometry(
    sourceGeometry: THREE.BufferGeometry,
) {
    const geometry =
        sourceGeometry.clone();

    /*
     * 현재 GLB에는 NORMAL 속성이 없으므로
     * 반드시 노멀을 계산해야 조명과 금속 색상이 표현됩니다.
     */
    geometry.computeVertexNormals();
    geometry.normalizeNormals();

    createRingUv(geometry);

    return geometry;
}

export default function CustomRingModel({
                                            selections,
                                        }: CustomRingModelProps) {
    const modelUrl =
        getRingModelUrl(selections);

    const { scene } =
        useGLTF(modelUrl);

    const finishProfile =
        getFinishProfile(
            selections.finish,
        );

    const normalMapUrl =
        getFinishTextureUrls(
            selections.finish,
        ).normalMap;

    const normalMap =
        useTexture(normalMapUrl);

    useEffect(() => {
        normalMap.wrapS =
            THREE.RepeatWrapping;

        normalMap.wrapT =
            THREE.RepeatWrapping;

        normalMap.repeat.set(4, 1);
        normalMap.anisotropy = 8;

        normalMap.colorSpace =
            THREE.NoColorSpace;

        normalMap.needsUpdate = true;
    }, [normalMap]);

    const metalColor =
        getMetalColor(selections);

    const metalMaterial =
        useMemo(() => {
            /*
             * 기존 torusGeometry에서 사용했던 재질과
             * 동일한 색상 및 금속 설정입니다.
             */
            const material =
                new THREE.MeshPhysicalMaterial({
                    name: "BellaMaisonMetal",

                    color:
                        new THREE.Color(
                            metalColor,
                        ),

                    metalness: 1,

                    /*
                     * 아무 표면도 선택하지 않았을 때는
                     * 기존 토러스 값인 0.15를 사용합니다.
                     */
                    roughness:
                        selections.finish
                            ? finishProfile.roughness
                            : 0.15,

                    normalMap,

                    normalScale:
                        new THREE.Vector2(
                            finishProfile.normalScale,
                            finishProfile.normalScale,
                        ),

                    envMapIntensity: 1,

                    side: THREE.DoubleSide,
                });

            material.anisotropy =
                finishProfile.anisotropy;

            material.anisotropyRotation =
                Math.PI / 2;

            return material;
        }, [
            finishProfile,
            metalColor,
            normalMap,
            selections.finish,
        ]);

    const preparedScene =
        useMemo(() => {
            const clonedScene =
                scene.clone(true);

            clonedScene.traverse(
                (child) => {
                    if (
                        !(
                            child instanceof
                            THREE.Mesh
                        )
                    ) {
                        return;
                    }

                    child.geometry =
                        prepareGeometry(
                            child.geometry,
                        );

                    child.material =
                        metalMaterial;

                    child.castShadow = true;
                    child.receiveShadow = true;
                },
            );

            return clonedScene;
        }, [
            scene,
            metalMaterial,
        ]);

    useEffect(
        () => () => {
            preparedScene.traverse(
                (child) => {
                    if (
                        child instanceof
                        THREE.Mesh
                    ) {
                        child.geometry.dispose();
                    }
                },
            );
        },
        [preparedScene],
    );

    useEffect(
        () => () => {
            metalMaterial.dispose();
        },
        [metalMaterial],
    );

    const sizeScale =
        getRingSizeScale(
            selections.size,
        );

    return (
        <Center>
            <group
                scale={[
                    sizeScale,
                    sizeScale,
                    sizeScale,
                ]}
            >
                <primitive
                    object={preparedScene}
                    dispose={null}
                />
            </group>
        </Center>
    );
}