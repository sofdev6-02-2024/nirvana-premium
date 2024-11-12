import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { sessionClaims } = await auth();
  const user = await currentUser();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {user?.emailAddresses[0].emailAddress}
            </p>
            <p>
              <strong>Role:</strong> {sessionClaims?.metadata.role}
            </p>
            <pre className="mt-4 rounded-md bg-gray-100 p-4">
              {JSON.stringify({ sessionClaims, user }, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
