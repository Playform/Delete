import p from"./Library/Deployment.js";import e from"./Library/Environment.js";import l from"./Library/Project.js";const t={"content-type":"application/json;charset=UTF-8","X-Auth-Email":e.Email,"X-Auth-Key":e.Key},E=7,h=1e3;var d=async(c=e.Email,r=e.Key,a=e.ID)=>{t["X-Auth-Email"]=c??t["X-Auth-Email"],t["X-Auth-Key"]=r??t["X-Auth-Key"];const n=[],i=await l(a,t)??[],m=async o=>(await p(a,o,t)).splice(0,h)??[];for(const{name:o}of i)for(const{id:s}of await m(o))await fetch(`${`https://api.cloudflare.com/client/v4/accounts/${a}/pages/projects/${o}/deployments`}/${s}`,{method:"DELETE",headers:t}),n.push(s);return n};export{E as Days,t as Header,h as Limit,d as default};