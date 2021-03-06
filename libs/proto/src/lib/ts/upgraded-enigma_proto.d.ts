import * as $protobuf from "protobufjs";
/** Namespace upgradedenigma. */
export namespace upgradedenigma {

    /** Properties of an Entity. */
    interface IEntity {

        /** Entity id */
        id?: (string|null);

        /** Entity num1 */
        num1?: (number|null);

        /** Entity num2 */
        num2?: (number|null);

        /** Entity boolean1 */
        boolean1?: (boolean|null);

        /** Entity float1 */
        float1?: (number|null);

        /** Entity any1 */
        any1?: (google.protobuf.IAny|null);

        /** Entity subEntities */
        subEntities?: (upgradedenigma.ISubEntity[]|null);
    }

    /** Represents an Entity. */
    class Entity implements IEntity {

        /**
         * Constructs a new Entity.
         * @param [p] Properties to set
         */
        constructor(p?: upgradedenigma.IEntity);

        /** Entity id. */
        public id: string;

        /** Entity num1. */
        public num1: number;

        /** Entity num2. */
        public num2: number;

        /** Entity boolean1. */
        public boolean1: boolean;

        /** Entity float1. */
        public float1: number;

        /** Entity any1. */
        public any1?: (google.protobuf.IAny|null);

        /** Entity subEntities. */
        public subEntities: upgradedenigma.ISubEntity[];

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns Entity
         */
        public static fromObject(d: { [k: string]: any }): upgradedenigma.Entity;

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @param m Entity
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: upgradedenigma.Entity, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Entity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SubEntity. */
    interface ISubEntity {

        /** SubEntity id */
        id?: (string|null);
    }

    /** Represents a SubEntity. */
    class SubEntity implements ISubEntity {

        /**
         * Constructs a new SubEntity.
         * @param [p] Properties to set
         */
        constructor(p?: upgradedenigma.ISubEntity);

        /** SubEntity id. */
        public id: string;

        /**
         * Creates a SubEntity message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns SubEntity
         */
        public static fromObject(d: { [k: string]: any }): upgradedenigma.SubEntity;

        /**
         * Creates a plain object from a SubEntity message. Also converts values to other types if specified.
         * @param m SubEntity
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: upgradedenigma.SubEntity, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubEntity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EntityById. */
    interface IEntityById {

        /** EntityById id */
        id?: (string|null);
    }

    /** Represents an EntityById. */
    class EntityById implements IEntityById {

        /**
         * Constructs a new EntityById.
         * @param [p] Properties to set
         */
        constructor(p?: upgradedenigma.IEntityById);

        /** EntityById id. */
        public id: string;

        /**
         * Creates an EntityById message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns EntityById
         */
        public static fromObject(d: { [k: string]: any }): upgradedenigma.EntityById;

        /**
         * Creates a plain object from an EntityById message. Also converts values to other types if specified.
         * @param m EntityById
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: upgradedenigma.EntityById, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityById to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents an EntityService */
    class EntityService extends $protobuf.rpc.Service {

        /**
         * Constructs a new EntityService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls FindOne.
         * @param request EntityById message or plain object
         * @param callback Node-style callback called with the error, if any, and Entity
         */
        public findOne(request: upgradedenigma.IEntityById, callback: upgradedenigma.EntityService.FindOneCallback): void;

        /**
         * Calls FindOne.
         * @param request EntityById message or plain object
         * @returns Promise
         */
        public findOne(request: upgradedenigma.IEntityById): Promise<upgradedenigma.Entity>;

        /**
         * Calls FindMany.
         * @param request EntityById message or plain object
         * @param callback Node-style callback called with the error, if any, and Entity
         */
        public findMany(request: upgradedenigma.IEntityById, callback: upgradedenigma.EntityService.FindManyCallback): void;

        /**
         * Calls FindMany.
         * @param request EntityById message or plain object
         * @returns Promise
         */
        public findMany(request: upgradedenigma.IEntityById): Promise<upgradedenigma.Entity>;
    }

    namespace EntityService {

        /**
         * Callback as used by {@link upgradedenigma.EntityService#findOne}.
         * @param error Error, if any
         * @param [response] Entity
         */
        type FindOneCallback = (error: (Error|null), response?: upgradedenigma.Entity) => void;

        /**
         * Callback as used by {@link upgradedenigma.EntityService#findMany}.
         * @param error Error, if any
         * @param [response] Entity
         */
        type FindManyCallback = (error: (Error|null), response?: upgradedenigma.Entity) => void;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param d Plain object
             * @returns Any
             */
            public static fromObject(d: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param m Any
             * @param [o] Conversion options
             * @returns Plain object
             */
            public static toObject(m: google.protobuf.Any, o?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
