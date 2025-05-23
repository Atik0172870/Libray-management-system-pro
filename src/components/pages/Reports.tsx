
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, TrendingUp, Users, BookOpen, AlertTriangle } from "lucide-react";

const Reports = () => {
  const monthlyStats = [
    { month: "Jan", issued: 120, returned: 110, newMembers: 15 },
    { month: "Feb", issued: 150, returned: 140, newMembers: 20 },
    { month: "Mar", issued: 180, returned: 165, newMembers: 18 },
    { month: "Apr", issued: 165, returned: 170, newMembers: 12 },
    { month: "May", issued: 200, returned: 185, newMembers: 25 },
    { month: "Jun", issued: 175, returned: 190, newMembers: 22 }
  ];

  const categoryStats = [
    { category: "Fiction", books: 156, issued: 89, color: "#3b82f6" },
    { category: "Science", books: 89, issued: 45, color: "#10b981" },
    { category: "History", books: 67, issued: 23, color: "#f59e0b" },
    { category: "Technology", books: 234, issued: 178, color: "#ef4444" },
    { category: "Business", books: 78, issued: 34, color: "#8b5cf6" },
    { category: "Arts", books: 45, issued: 12, color: "#06b6d4" }
  ];

  const membershipTrends = [
    { month: "Jan", active: 180, inactive: 20, new: 15 },
    { month: "Feb", active: 195, inactive: 18, new: 20 },
    { month: "Mar", active: 210, inactive: 15, new: 18 },
    { month: "Apr", active: 218, inactive: 17, new: 12 },
    { month: "May", active: 238, inactive: 12, new: 25 },
    { month: "Jun", active: 255, inactive: 10, new: 22 }
  ];

  const overdueAnalysis = [
    { range: "1-7 days", count: 15, fine: 45.00 },
    { range: "8-14 days", count: 8, fine: 64.00 },
    { range: "15-30 days", count: 4, fine: 80.00 },
    { range: "30+ days", count: 2, fine: 120.00 }
  ];

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive library performance insights</p>
        </div>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Circulation</p>
                <p className="text-3xl font-bold text-gray-900">1,090</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-3xl font-bold text-gray-900">255</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Books in Circulation</p>
                <p className="text-3xl font-bold text-gray-900">381</p>
                <p className="text-sm text-blue-600">Currently issued</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                <p className="text-3xl font-bold text-red-600">29</p>
                <p className="text-sm text-red-600">$309 in fines</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Book Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyStats}>
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
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="issued"
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={membershipTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="active" stroke="#3b82f6" name="Active Members" />
                <Line type="monotone" dataKey="new" stroke="#10b981" name="New Members" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueAnalysis.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.range}</p>
                    <p className="text-sm text-gray-600">{item.count} books</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">${item.fine.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">total fines</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => generateReport('monthly')}
            >
              <FileText className="h-6 w-6" />
              <span>Monthly Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => generateReport('overdue')}
            >
              <AlertTriangle className="h-6 w-6" />
              <span>Overdue Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => generateReport('member')}
            >
              <Users className="h-6 w-6" />
              <span>Member Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
