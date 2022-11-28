const mockApp = {
    getName: () => 'SurveyCTO Desktop',
    getVersion: () => '2.80'
};

const mockScreen = {
    getPrimaryDisplay: () => {
        return {
            size: { width: 60, height: 60 }
        };
    }
};

  
export const app = mockApp;
export const screen = mockScreen;
