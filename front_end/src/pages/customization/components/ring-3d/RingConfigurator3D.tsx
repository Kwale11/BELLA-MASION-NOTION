import { Suspense } from "react";

import {
    Canvas,
} from "@react-three/fiber";

import {
    Html,
} from "@react-three/drei";

import {
    NoToneMapping,
    SRGBColorSpace,
} from "three";

import type { CustomizationSelections } from "../../types/customization";

import RingScene from "./RingScene";

import "./RingConfigurator3D.css";

interface RingConfigurator3DProps {
    selections: CustomizationSelections;
}

function RingLoading() {
    return (
        <Html center>
            <div className="ring-configurator-3d__loading">
                <span />
                <p>반지를 제작하고 있습니다.</p>
            </div>
        </Html>
    );
}

export default function RingConfigurator3D({
                                               selections,
                                           }: RingConfigurator3DProps) {
    return (
        <section className="ring-configurator-3d">
            <div className="ring-configurator-3d__canvas">
                <Canvas
                    dpr={[1, 2]}
                    shadows
                    frameloop="demand"
                    camera={{
                        position: [
                            0,
                            1.1,
                            5.2,
                        ],
                        fov: 32,
                        near: 0.1,
                        far: 100,
                    }}
                    gl={{
                        antialias: false,
                        alpha: false,
                        powerPreference:
                            "high-performance",

                        /*
                         * ToneMapping 효과에서
                         * ACES를 마지막에 적용합니다.
                         */
                        toneMapping:
                        NoToneMapping,

                        outputColorSpace:
                        SRGBColorSpace,
                    }}
                    fallback={
                        <div className="ring-configurator-3d__unsupported">
                            이 브라우저에서는 3D
                            미리보기를 사용할 수
                            없습니다.
                        </div>
                    }
                >
                    <Suspense
                        fallback={<RingLoading />}
                    >
                        <RingScene
                            selections={
                                selections
                            }
                        />
                    </Suspense>
                </Canvas>
            </div>

            <header className="ring-configurator-3d__header">
                <div>
                    <span>3D PREVIEW</span>
                    <h2>나의 반지</h2>
                </div>

                <p>
                    드래그하여 회전 · 스크롤하여 확대
                </p>
            </header>

            <p className="ring-configurator-3d__notice">
                3D 이미지는 선택 옵션을 비교하기 위한
                미리보기이며 실제 제품의 색상과 비율은
                제작 과정에서 일부 달라질 수 있습니다.
            </p>
        </section>
    );
}