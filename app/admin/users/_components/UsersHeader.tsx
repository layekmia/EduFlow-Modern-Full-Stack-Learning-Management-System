
export default function UsersHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage all users on the platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
