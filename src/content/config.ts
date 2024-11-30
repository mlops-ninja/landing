// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content';

// 2. Define your collection(s)
const blog = defineCollection({
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.union([z.string(), image()]),
      alt: z.union([z.string(), image()]),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string().default('Astroship'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const team = defineCollection({
  schema: ({image}) =>  z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: image(),
      alt: z.string(),
    }),
    description: z.string().optional(),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});


const lifecycle = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    sections: z.array(reference('section')),
  }),
});

const section = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blog,
  'team': team,
  'lifecycle': lifecycle,
  'section': section,
};
