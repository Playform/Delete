/**
 * @module Delete
 *
 */
// @TODO: Find a way to use await in parameters
export default (async (
	...[{ Email, ID, Key } = Environment.parse(process.env)]: Parameters<Type>
) => {
	const Header = {
		"content-type": "application/json;charset=UTF-8",
		"X-Auth-Email": Email,
		"X-Auth-Key": Key,
	};

	Header["X-Auth-Email"] = Email ?? Header["X-Auth-Email"];
	Header["X-Auth-Key"] = Key ?? Header["X-Auth-Key"];

	const Deleted = [];

	for (const { name } of (await (
		await import("./Project.js")
	).default(ID, Header)) ?? []) {
		for (const { id, created_on } of (
			await (async (Project: string) =>
				(
					await (
						await import("./Deployment.js")
					).default(ID, Project, Header)
				).splice(0, 500) ?? [])(name)
		).reverse()) {
			if (
				// @ts-ignore
				(Date.now() - new Date(created_on)) / 86400000 >
				7
			) {
				try {
					await fetch(
						`${`https://api.cloudflare.com/client/v4/accounts/${ID}/pages/projects/${name}/deployments`}/${id}`,
						{
							method: "DELETE",
							headers: Header,
						}
					);
				} catch (_Error) {}

				Deleted.push(id);
			}
		}
	}

	return Deleted;
}) satisfies Type as Type;

// This is used only once because:
// 'await' expressions cannot be used in a parameter initializer.ts(2524)
export const { default: Environment } = await import(
	"../Variable/Environment.js"
);

import type Type from "../Interface/Delete.js";
