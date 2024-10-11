import { getThemesByGameId, getGames, getGameLevels } from '../http/queries';
import { unauthenticatedClient } from '../http/clients';
import { Game, GameLevel, Theme } from '../interfaces/interfaces';

jest.mock('axios');

jest.mock('../http/clients', () => ({
  unauthenticatedClient: {
    get: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  },
}));

describe('queries', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getThemesByGameId', () => {
        it('should return themes when the response status is 200', async () => {
            const mockThemes: Theme[] = [{
                id: 1,
                name: 'Theme 1',
                image: ''
            }];
            (unauthenticatedClient.get as jest.Mock).mockResolvedValue({ status: 200, data: mockThemes });

            const result = await getThemesByGameId(1);

            expect(result).toEqual(mockThemes);
            expect(unauthenticatedClient.get).toHaveBeenCalledWith('theme/getThemes/1');
        });

        it('should return null when the response status is not 200', async () => {
            (unauthenticatedClient.get as jest.Mock).mockResolvedValue({ status: 404 });

            const result = await getThemesByGameId(1);

            expect(result).toBeNull();
            expect(unauthenticatedClient.get).toHaveBeenCalledWith('theme/getThemes/1');
        });
    });

    describe('getGames', () => {
        it('should return games when the response status is 200', async () => {
            const mockGames: Game[] = [{
                id: 1,
                name: 'Game 1',
                image: 'Adventure',
            }];
            (unauthenticatedClient.get as jest.Mock).mockResolvedValue({ status: 200, data: mockGames });

            const result = await getGames();

            expect(result).toEqual(mockGames);
            expect(unauthenticatedClient.get).toHaveBeenCalledWith('/getGames/getGames');
        });

        it('should return null when the response status is not 200', async () => {
            (unauthenticatedClient.get as jest.Mock).mockResolvedValue({ status: 404 });

            const result = await getGames();

            expect(result).toBeNull();
            expect(unauthenticatedClient.get).toHaveBeenCalledWith('/getGames/getGames');
        });
    });

    describe('getGameLevels', () => {
        it('should return game levels when the response status is 200', async () => {
            const mockGameLevels: GameLevel[] = [{
                id: 1,
                description: 'Level 1',
                options: [],
            }];
            (unauthenticatedClient.get as jest.Mock).mockResolvedValue({ status: 200, data: mockGameLevels });

            const result = await getGameLevels(1);

            expect(result).toEqual(mockGameLevels);
            expect(unauthenticatedClient.get).toHaveBeenCalledWith('/activities/getActivities1');
        });

        it('should return null when the response status is not 200', async () => {
            (unauthenticatedClient.get as jest.Mock).mockResolvedValue({ status: 404 });

            const result = await getGameLevels(1);

            expect(result).toBeNull();
            expect(unauthenticatedClient.get).toHaveBeenCalledWith('/activities/getActivities1');
        });
    });
});
