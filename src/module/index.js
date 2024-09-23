import { createRouter, defineEventHandler } from 'h3';

const router = createRouter();

router.get('/', defineEventHandler((event) => {
  return 'module search'
}))

export default router;
