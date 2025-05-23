
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, BookPlus, BookMinus, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Books",
      value: "2,456",
      icon: BookOpen,
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Active Members",
      value: "1,234",
      icon: Users,
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "Books Issued",
      value: "456",
      icon: BookPlus,
      change: "+5%",
      changeType: "increase"
    },
    {
      title: "Overdue Books",
      value: "23",
      icon: AlertTriangle,
      change: "-15%",
      changeType: "decrease"
    }
  ];

  const monthlyData = [
    { month: "Jan", issued: 120, returned: 110 },
    { month: "Feb", issued: 150, returned: 140 },
    { month: "Mar", issued: 180, returned: 165 },
    { month: "Apr", issued: 165, returned: 170 },
    { month: "May", issued: 200, returned: 185 },
    { month: "Jun", issued: 175, returned: 190 }
  ];

  const categoryData = [
    { name: "Fiction", value: 35, color: "#8884d8" },
    { name: "Science", value: 25, color: "#82ca9d" },
    { name: "History", value: 20, color: "#ffc658" },
    { name: "Technology", value: 15, color: "#ff7300" },
    { name: "Others", value: 5, color: "#00ff00" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening in your library.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Book Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issued" fill="#3b82f6" name="Books Issued" />
                <Bar dataKey="returned" fill="#10b981" name="Books Returned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Books by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Book Issued", details: "The Great Gatsby issued to John Doe", time: "2 hours ago", type: "issue" },
              { action: "Book Returned", details: "To Kill a Mockingbird returned by Jane Smith", time: "4 hours ago", type: "return" },
              { action: "New Member", details: "Alice Johnson registered as new member", time: "6 hours ago", type: "member" },
              { action: "Overdue Alert", details: "1984 is overdue from Mike Wilson", time: "1 day ago", type: "overdue" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className={`p-2 rounded-full ${
                  activity.type === 'issue' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'return' ? 'bg-green-100 text-green-600' :
                  activity.type === 'member' ? 'bg-purple-100 text-purple-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {activity.type === 'issue' && <BookPlus className="h-4 w-4" />}
                  {activity.type === 'return' && <BookMinus className="h-4 w-4" />}
                  {activity.type === 'member' && <Users className="h-4 w-4" />}
                  {activity.type === 'overdue' && <AlertTriangle className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
