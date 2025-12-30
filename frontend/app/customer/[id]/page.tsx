export default async function CustomerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
         <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          fontFamily: "Arial, sans-serif", 
          marginTop: "50px" }}>
         <h1>Welcome to the Customer Page</h1>
         <h1>Customer ID: {id}</h1>
         </div>
    );
}