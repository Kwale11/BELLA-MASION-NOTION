import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Bounds,
    Environment,
    Html,
    Lightformer,
    OrbitControls,
} from "@react-three/drei";

import type {
    CustomizationSelections,
} from "../../types/customization";

import CustomRingModel from "./CustomRingModel";

interface RingPreview3DProps {
    selections: CustomizationSelections;
}

function RingLoading() {
    return (
        <Html center>
            <p
                style={{
                    margin: 0,
                    color: "#6f6962",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                }}
            >
                반지를 불러오는 중입니다.
            </p>
        </Html>
    );
}

export default function RingPreview3D({
                                          selections,
                                      }: RingPreview3DProps) {
    const modelKey = [
        selections.shape || "classic-round",
        selections.width || "3mm",
    ].join("-");

    return (
        <div
            style={{
                width: "100%",
                height: "400px",
            }}
        >
            <Canvas
                dpr={[1, 2]}
                shadows
                camera={{
                    position: [0, 0, 5],
                    fov: 40,
                    near: 0.1,
                    far: 100,
                }}
            >
                <color
                    attach="background"
                    args={["#ebe7e1"]}
                />

                {/* 기존 토러스에서 사용하던 조명 */}
                <ambientLight intensity={1.5} />

                <directionalLight
                    castShadow
                    position={[4, 4, 5]}
                    intensity={3}
                />

                <Suspense fallback={<RingLoading />}>
                    <Bounds
                        fit
                        clip
                        observe
                        margin={1.6}
                    >
                        <CustomRingModel
                            key={modelKey}
                            selections={selections}
                        />
                    </Bounds>

                    {/* 기존 토러스와 동일한 환경맵 */}
                    {/*<Environment preset="studio" />*/}
                    <Environment resolution={512}>
                        {/*
     * 금속이 반사할 기본 공간을 완전한 검정이 아닌
     * 어두운 회색으로 설정합니다.
     */}
                        <color
                            attach="background"
                            args={["#918b84"]}
                        />

                        {/* 정면의 넓은 소프트박스 */}
                        <Lightformer
                            form="rect"
                            color="#fffaf2"
                            intensity={3}
                            position={[0, 1, 5]}
                            rotation={[0, Math.PI, 0]}
                            scale={[5, 7, 1]}
                        />

                        {/* 왼쪽 골드 톤 반사판 */}
                        <Lightformer
                            form="rect"
                            color="#fff0d2"
                            intensity={2}
                            position={[-5, 1, 0]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={[4, 7, 1]}
                        />

                        {/* 오른쪽 흰색 반사판 */}
                        <Lightformer
                            form="rect"
                            color="#ffffff"
                            intensity={1.5}
                            position={[5, 0, 1]}
                            rotation={[0, -Math.PI / 2, 0]}
                            scale={[3, 6, 1]}
                        />

                        {/* 위쪽 하이라이트 */}
                        <Lightformer
                            form="rect"
                            color="#ffffff"
                            intensity={1.5}
                            position={[0, 5, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={[6, 4, 1]}
                        />
                    </Environment>
                </Suspense>

                <OrbitControls
                    makeDefault
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.08}
                    minDistance={1}
                    maxDistance={30}
                />
            </Canvas>
        </div>
    );
}