import {
    ContactShadows,
    Environment,
    OrbitControls,
} from "@react-three/drei";

import {
    EffectComposer,
    N8AO,
    SMAA,
    ToneMapping,
} from "@react-three/postprocessing";

import {
    HalfFloatType,
} from "three";

import {
    ToneMappingMode,
} from "postprocessing";

import type { CustomizationSelections } from "../../types/customization";

import CustomRingModel from "./CustomRingModel";

interface RingSceneProps {
    selections: CustomizationSelections;
}

export default function RingScene({
                                      selections,
                                  }: RingSceneProps) {
    return (
        <>
            <color
                attach="background"
                args={["#ebe7e1"]}
            />

            <ambientLight intensity={0.12} />

            <directionalLight
                castShadow
                position={[4, 6, 5]}
                intensity={1.4}
                color="#fff8ee"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />

            <spotLight
                castShadow
                position={[-4, 4, 3]}
                intensity={65}
                angle={0.42}
                penumbra={0.8}
                color="#e7efff"
            />

            <CustomRingModel
                selections={selections}
            />

            <ContactShadows
                position={[0, -1.25, 0]}
                opacity={0.32}
                scale={7}
                blur={2.5}
                far={4}
                resolution={512}
                frames={1}
            />

            <Environment
                files="/hdri/jewelry-studio-2k.hdr"
                background={false}
                environmentIntensity={1.35}
                environmentRotation={[
                    0,
                    Math.PI * 0.15,
                    0,
                ]}
            />

            <OrbitControls
                makeDefault
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                minDistance={3.4}
                maxDistance={7}
                minPolarAngle={
                    Math.PI * 0.2
                }
                maxPolarAngle={
                    Math.PI * 0.78
                }
            />

            <EffectComposer
                multisampling={0}
                frameBufferType={HalfFloatType}
            >
                <N8AO
                    quality="high"
                    halfRes
                    aoRadius={0.25}
                    distanceFalloff={0.8}
                    intensity={0.65}
                    denoiseRadius={8}
                />

                <SMAA />

                <ToneMapping
                    mode={
                        ToneMappingMode.ACES_FILMIC
                    }
                />
            </EffectComposer>
        </>
    );
}