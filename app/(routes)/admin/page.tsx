"use client";

interface AdminPageProps {
  children: React.ReactNode;
}

const AdminPage: React.FC<AdminPageProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AdminPage;
