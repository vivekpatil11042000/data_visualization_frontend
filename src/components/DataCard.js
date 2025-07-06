import React from 'react';
import { formatDateTime, formatRelativeTime } from '../utils/dateTimeUtil';

/**
 * DataCard component for displaying MQTT document data
 * @param {Object} props - Component props
 * @param {Object} props.data - MQTT document data
 * @param {string} props.data.id - Document ID
 * @param {Object} props.data.payload - Message payload (JSON object)
 * @param {number} props.data.publish_received_at - Timestamp when message was received
 * @param {boolean} props.loading - Loading state
 * @param {string} props.className - Additional CSS classes
 */
const DataCard = ({ data, loading = false, className = '' }) => {
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200 ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">No MQTT documents found</p>
        </div>
      </div>
    );
  }

  // Extract payload data safely
  const payload = data.payload || {};
  const heartBeatRate = payload.heartBeatRate;
  const payloadTimestamp = payload.timestamp;

  // Format timestamps
  const receivedAt = formatDateTime(data.publish_received_at);
  const receivedAtRelative = formatRelativeTime(data.publish_received_at);
  const payloadTime = payloadTimestamp ? formatDateTime(payloadTimestamp * 1000) : null; // Convert seconds to milliseconds

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Latest MQTT Data</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>

      {/* Document ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Document ID</label>
        <div className="bg-gray-50 rounded-md p-2 border">
          <code className="text-sm text-gray-800 font-mono break-all">{data.id}</code>
        </div>
      </div>

      {/* Payload Data */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">Payload Data</label>
        <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
          {heartBeatRate !== undefined && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Heart Beat Rate:</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-600">{heartBeatRate}</span>
                <span className="text-sm text-gray-500">bpm</span>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
          
          {payloadTimestamp && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Payload Timestamp:</span>
              <span className="text-sm text-gray-600">{payloadTime}</span>
            </div>
          )}

          {/* Show all payload data as JSON */}
          <details className="mt-3">
            <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600">
              View Raw Payload
            </summary>
            <div className="mt-2 bg-white rounded border p-2">
              <pre className="text-xs text-gray-600 overflow-x-auto">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>

      {/* Timestamp Information */}
      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">Received At</label>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Date & Time:</span>
            <span className="text-sm font-medium text-gray-800">{receivedAt}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Relative:</span>
            <span className="text-sm font-medium text-blue-600">{receivedAtRelative}</span>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Status: Active</span>
          <span>Last updated: {receivedAtRelative}</span>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
