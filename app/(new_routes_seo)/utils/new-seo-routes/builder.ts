import { SlugsType } from "@/app/common/constatns/slug.constants";
import redisService from "@/app/utils/redis/redis.service";
export async function findPathForBuilderDetails(inputUrl: string) {
  const builderJsonData = await redisService.getBuilderSlug(SlugsType.BUILDER);
  for (const path in builderJsonData) {
    if (path.startsWith(inputUrl)) {
      return builderJsonData[path];
    }
  }
  return null;
}
