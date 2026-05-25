# Client logos (Our Clients section)

Add your client logo files here (e.g. `automation-india.png`, `powergrid.svg`).

Then in `src/data/clients.ts`, set `logoUrl` for each client, e.g.:

```ts
{ name: "Automation India Ltd", logoUrl: "/clients/automation-india.png" }
```

If `logoUrl` is omitted, the section shows the client’s initials in a styled box.
