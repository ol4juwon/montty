const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600';
      case 'TMDB_URL':
        return 'https://api.themoviedb.org/3';
      case 'TMDB_KEY':
        return '1a47d932506fd02b2927ecb25c1ddd5f';
      case 'DATABASE_TYPE':
        return 'postgres';
      case 'DATABASE_HOST':
        return '127.0.0.1';
      case 'DATABASE_USER':
        return 'concher_admin';
      case 'DATABASE_NAME':
        return 'montech';
      case 'DATABASE_PASSWORD':
        return 'concher1234';
      case 'DATABASE_PORT':
        return 5432;
    }
  },
};

export default mockedConfigService;
