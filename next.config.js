
module.exports = {
  async redirects(){
    return[
      {
        source: '/',
        destination: '/movies',
        permanent: true,
      }
    ]
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.pinimg.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }