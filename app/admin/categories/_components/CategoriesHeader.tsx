export default function CategoriesHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Categories
          </h1>
          <p className="text-muted-foreground mt-2">
            Organize your courses with categories
          </p>
        </div>
      </div>
    </div>
  );
}