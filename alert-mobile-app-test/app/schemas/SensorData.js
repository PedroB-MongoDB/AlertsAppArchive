export const SensorData = {
    name: 'sensorData',
    properties: {
        _id: 'objectId?',
        _partition: 'string?',
        data : "data",
        acknowledged: 'bool?',
        acknowledgedBy: 'string?',
        code: 'int?',
        id: 'string?',
        notes: 'string?',
        ts: 'date?',
      },
    primaryKey: '_id',
};
