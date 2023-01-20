export function generateProgressPercentage(all: number, completed: number) {
   return Math.round((completed / all) * 100);
}
