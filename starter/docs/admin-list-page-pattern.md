# Admin List Page Pattern

Use this shape when building real admin pages.

```tsx
export default async function AdminListPage() {
  const rows = await loadRows();

  return (
    <main className="theme-app min-h-screen">
      <div className="mx-auto max-w-wide px-5 py-6">
        <h1 className="text-display-sm font-semibold">Records</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <MetricTile label="Total" value={rows.length} />
          <MetricTile label="Needs review" value={rows.filter((row) => row.status === 'review').length} />
          <MetricTile label="Ready" value={rows.filter((row) => row.status === 'ready').length} />
        </div>
      </div>
    </main>
  );
}
```

Required states:

- loading
- empty
- error
- filtered empty
- mobile table alternative
