const { getTaskByDate } = require('../index');
const taskModel = require('../models/task.model');

jest.mock('../models/task.model');

describe('getTaskByDate', () => {
  it('should return tasks created or updated within a given date', async () => {
    const mockTasks = [{ _id: '1' }, { _id: '2' }];
    taskModel.find.mockResolvedValue(mockTasks);

    const result = await getTaskByDate('2025-06-24');
    expect(taskModel.find).toHaveBeenCalledWith(
      expect.objectContaining({
        $or: expect.any(Array),
      })
    );
    expect(result).toBe(mockTasks);
  });

  it('should handle errors and log them', async () => {
    const errorSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    taskModel.find.mockRejectedValue(new Error('DB error'));
    await getTaskByDate('2025-06-24');
    expect(errorSpy).toHaveBeenCalledWith(
      'Error fetching task: ',
      'DB error'
    );
    errorSpy.mockRestore();
  });
});
