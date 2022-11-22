const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600';
      case 'TMDB_URL':
        return 'https://api.themoviedb.org/3';
      case 'TMDB_KEY':
        return '1a47d932506fd02b2927ecb25c1ddd5f';
    }
  },
};

export default mockedConfigService;
