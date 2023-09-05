import type { HeadersInit } from "@cloudflare/workers-types/experimental";
import type Environment from "../Library/Environment.js";
/**
 * The function `Deployment` makes an asynchronous request to the Cloudflare API to retrieve deployment
 * information for a specific project.
 * @param {string} ID - The `ID` parameter is a string that represents the Cloudflare account ID. It is
 * used to identify the Cloudflare account for which the deployment is being made.
 * @param {string} Project - The `Project` parameter is a string that represents the project ID or
 * name. It is used to specify the project for which you want to retrieve the deployments.
 * @param {HeadersInit} Header - The `Header` parameter is an object that represents the headers to be
 * included in the HTTP request. It should be of type `HeadersInit`, which is a type alias for `Headers
 * | string[][] | Record<string, string>`.
 */
declare const _default: (ID: Environment["ID"], Project: string, Header: HeadersInit) => Promise<{
    created_on: Date;
    id: string;
}[]>;
export default _default;