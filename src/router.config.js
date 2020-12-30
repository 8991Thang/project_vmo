import { Customers } from "./pages/customers/customers";
import { CreateCustomers } from "./pages/customers/customers-create";
import { CustomersDetails } from "./pages/customers/customers-details";
import { NotFound } from "./pages/not-found/not-found";
import { ProjectStatus } from "./pages/project-status/project-status";
import { CreateProjectStatus } from "./pages/project-status/project-status-create";
import { ProjectStatusDetails } from "./pages/project-status/project-status-details";
import { ProjectType } from "./pages/project-type/project-type";
import { ProjectTypeCreate } from "./pages/project-type/project-type-create";
import { ProjectTypeDetails } from "./pages/project-type/project-type-details";
import { TechStack } from "./pages/tech-stack/tech-stack";
import { TechStackCreate } from "./pages/tech-stack/tech-stack-create";
import { TeckStackDetails } from "./pages/tech-stack/tech-stack-details";
import { Departments } from "./pages/departments/departments";
import { DepartmentsCreate } from "./pages/departments/deprtments-create";
import { DepartmentDetails } from "./pages/departments/department-details";
import { Projects } from "./pages/projects/projects";
import { ProjectDetails } from "./pages/projects/project-details";
import { ProjectCreate } from "./pages/projects/project-create";
import { Staffs } from "./pages/staffs/staffs";
import { StaffCreate } from "./pages/staffs/staffs-create";
import { StaffDetail } from "./pages/staffs/staff-detail";

export const routes = [
  {
    path: "/project-type",
    exact: true,
    component: ProjectType,
  },
  {
    path: "/project-type/create",
    exact: true,
    component: ProjectTypeCreate,
  },
  {
    path: "/project-type/:id",
    exact: true,
    component: ProjectTypeDetails,
  },
  {
    path: "/tech-stack",
    exact: true,
    component: TechStack,
  },
  {
    path: "/tech-stack/create",
    exact: true,
    component: TechStackCreate,
  },
  {
    path: "/tech-stack/:id",
    exact: true,
    component: TeckStackDetails,
  },
  {
    path: "/project-status",
    exact: true,
    component: ProjectStatus,
  },
  {
    path: "/project-status/create",
    exact: true,
    component: CreateProjectStatus,
  },
  {
    path: "/project-status/:id",
    exact: true,
    component: ProjectStatusDetails,
  },
  {
    path: "/customers",
    exact: true,
    component: Customers,
  },
  {
    path: "/customers/create",
    exact: true,
    component: CreateCustomers,
  },
  {
    path: "/customers/:id",
    exact: true,
    component: CustomersDetails,
  },
  {
    path: "/departments",
    exact: true,
    component: Departments,
  },
  {
    path: "/departments/create",
    exact: true,
    component: DepartmentsCreate,
  },
  {
    path: "/departments/:id",
    exact: true,
    component: DepartmentDetails,
  },
  {
    path: "/projects",
    exact: true,
    component: Projects,
  },
  {
    path: "/projects/create",
    exact: true,
    component: ProjectCreate,
  },
  {
    path: "/projects/:id",
    exact: true,
    component: ProjectDetails,
  },
  {
    path: "/staffs",
    exact: true,
    component: Staffs,
  },
  {
    path: "/staffs/create",
    exact: true,
    component: StaffCreate,
  },
  {
    path: "/staffs/:id",
    exact: true,
    component: StaffDetail,
  },
  {
    path: "",
    component: NotFound,
  },
];
