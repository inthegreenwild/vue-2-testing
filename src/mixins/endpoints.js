export default {
  methods: {
    buildTeleportURL(query) {
      const validSlug = query.split(' ').join('-').toLowerCase();
      return `https://api.teleport.org/api/urban_areas/slug:${validSlug}/scores/`;
    },
  },
};

