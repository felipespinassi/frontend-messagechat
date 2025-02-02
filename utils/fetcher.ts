export const fetcher = (...args: any) =>
  fetch(...args, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkZlbGlwZSIsImVtYWlsIjoiZmVsaXBlQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFRvWGFMa3I2UnBFMGtDNEFxSVZBdmVmSDFFSlhGNW9wR3RyTnJzZFNpWUpZNElKcVJJWlg2IiwiaWF0IjoxNzM3MzAyMTA5fQ.6wTM-vwYngBYNi_RQYqRenavr3dM1ezJQzhwZwBmTIk",
    },
  }).then((res) => res.json());
