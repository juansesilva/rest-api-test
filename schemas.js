const zod = require('zod');

const movieSchema = zod.object({
    title: zod.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }).min(1),
    genre: zod.array(zod.string().refine((value) => {
      const validGenres = [
        'Action',
        'Drama',
        'Comedy',
        'Fantasy',
        'Horror',
        'Romance',
        'Sci-Fi',
        'Thriller',
      ];
      return validGenres.includes(value) || validGenres.includes(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    }, {
      message: 'Invalid genre',
    })),
    year: zod.number().int().positive().min(1900).max(new Date().getFullYear()),
    director: zod.string().min(1),
    duration: zod.number().int().positive(),
    poster: zod.string().url(),
  });

function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}

function validatePartialMovie(movie) {
    return movieSchema.partial().safeParse(movie);
}


module.exports = {
    validateMovie, 
    validatePartialMovie,
};
