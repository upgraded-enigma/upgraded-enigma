/**
 * @fileoverview gRPC-Web generated client stub for upgradedenigma
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_pb = require('./common_pb.js')
const proto = {};
proto.upgradedenigma = require('./root_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.upgradedenigma.EntityServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.upgradedenigma.EntityServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.upgradedenigma.EntityById,
 *   !proto.upgradedenigma.Entity>}
 */
const methodDescriptor_EntityService_FindOne = new grpc.web.MethodDescriptor(
  '/upgradedenigma.EntityService/FindOne',
  grpc.web.MethodType.UNARY,
  common_pb.EntityById,
  common_pb.Entity,
  /**
   * @param {!proto.upgradedenigma.EntityById} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.Entity.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.upgradedenigma.EntityById,
 *   !proto.upgradedenigma.Entity>}
 */
const methodInfo_EntityService_FindOne = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.Entity,
  /**
   * @param {!proto.upgradedenigma.EntityById} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.Entity.deserializeBinary
);


/**
 * @param {!proto.upgradedenigma.EntityById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.upgradedenigma.Entity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.upgradedenigma.Entity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.upgradedenigma.EntityServiceClient.prototype.findOne =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/upgradedenigma.EntityService/FindOne',
      request,
      metadata || {},
      methodDescriptor_EntityService_FindOne,
      callback);
};


/**
 * @param {!proto.upgradedenigma.EntityById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.upgradedenigma.Entity>}
 *     Promise that resolves to the response
 */
proto.upgradedenigma.EntityServicePromiseClient.prototype.findOne =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/upgradedenigma.EntityService/FindOne',
      request,
      metadata || {},
      methodDescriptor_EntityService_FindOne);
};


module.exports = proto.upgradedenigma;

