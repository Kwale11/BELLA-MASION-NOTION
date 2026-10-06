declare module "occt-import-js" {

    interface OcctInitializationOptions {
        locateFile?: (
            path: string,
            prefix?: string,
        ) => string;
    }


    interface OcctAttribute {
        array:
            | number[]
            | number[][];
    }


    interface OcctIndex {
        array:
            | number[]
            | number[][];
    }


    interface OcctMesh {

        name?: string;

        attributes: {

            position:
                OcctAttribute;

            normal?:
                OcctAttribute;
        };

        index?:
            OcctIndex;
    }


    interface OcctImportResult {

        success:
            boolean;

        meshes?:
            OcctMesh[];
    }


    interface OcctModule {

        ReadStepFile(
            content: Uint8Array,
            params?: unknown,
        ): OcctImportResult;


        ReadIgesFile(
            content: Uint8Array,
            params?: unknown,
        ): OcctImportResult;


        ReadBrepFile(
            content: Uint8Array,
            params?: unknown,
        ): OcctImportResult;
    }


    export default function occtImportJs(
        options?:
        OcctInitializationOptions,
    ): Promise<OcctModule>;
}