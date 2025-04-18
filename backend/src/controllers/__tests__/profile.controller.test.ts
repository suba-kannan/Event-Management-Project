import { getUserProfileEvents } from '../profile.controller';
import { Response } from 'express';
import { AppDataSource } from '../../config/data-source';
import { Event } from '../../entities/Event';
import { AuthRequest } from '../../middleware/authMiddleware';
import { Repository } from 'typeorm';

jest.mock('../../config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('getUserProfileEvents', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let findMock: jest.Mock;

  beforeEach(() => {
    findMock = jest.fn();

    const mockRepository = {
      find: findMock,
    } as Partial<Repository<Event>>;

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    mockReq = {
      user: {
        id: 1,
        role: 'Organizer',
      },
    };

    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return created events for Organizer role', async () => {
    const createdEvents = [{ id: 1, name: 'Test Event' }];
    findMock.mockResolvedValue(createdEvents);

    await getUserProfileEvents(mockReq as AuthRequest, mockRes as Response);

    expect(findMock).toHaveBeenCalledWith({
      where: { organizer: { id: 1 } },
      relations: ['organizer'],
    });
    expect(mockRes.json).toHaveBeenCalledWith({ createdEvents });
  });

  it('should return 403 for non-Organizer role', async () => {
    mockReq = {
      user: {
        id: 1,
        role: 'User',
      },
    };

    await getUserProfileEvents(mockReq as AuthRequest, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized role' });
  });

  it('should return 500 if an error occurs', async () => {
    findMock.mockRejectedValue(new Error('Some error'));

    await getUserProfileEvents(mockReq as AuthRequest, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });

  it('should return empty array when no events are found for Organizer', async () => {
    findMock.mockResolvedValue([]);

    await getUserProfileEvents(mockReq as AuthRequest, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({ createdEvents: [] });
  });
});
