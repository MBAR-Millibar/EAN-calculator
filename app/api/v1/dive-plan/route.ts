import { divePlanEndpoint } from "@/lib/api/endpoints";
import { calculationRoute } from "@/lib/api/handler";

export const dynamic = "force-dynamic";

export const GET = calculationRoute(divePlanEndpoint);
