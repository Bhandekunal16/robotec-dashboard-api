export const user = {
  Controller: 'robotec-user',
  register: 'test',
  Login: 'login',
  avatar: 'avtor',
  RegisterShop: 'registershop',
  EditProfile: 'editProfile',
  GetAllUser: 'alluser',
};
export const youtube = {
  Controller: 'youtube',
  CreateYoutube: 'createYoutube',
  getCount: 'getCount1',
  getAll: 'getAllYoutube',
  get: 'getYoutube',
};

export class Project {
  readonly Controller = 'project';
  readonly AddProject = 'addproject';
  readonly GetAllProject = 'getallproject';
  readonly getCount = 'getCount';
  readonly getProject = 'getproject';
  readonly editProject = 'edit';
  readonly deleteProject = 'delete'; 
}

export const instagram = {
  Controller: 'insta',
  createInsta: 'createInsta',
  getAll: 'getAllinst',
  getFollower: 'getFollower',
  getFollowing: 'getFollowing',
  getInsta: 'getInsta',
};

export class AuthRoute {
  readonly Controller = 'auth';
  readonly Register = 'register';
  readonly addInfo = 'add/info';
  readonly Login = 'login';
  readonly addTask = 'task/add';
  readonly getTask = 'task/get';
  readonly removeTask = 'task/remove';
  readonly taskStatus = 'task/status';
  readonly setTaskStatusPending = 'task/status/pending';
  readonly updateTask = 'task/updates';
  readonly taskCount = 'task/count';
  readonly getTaskWithEmail = 'task/get/:email';
}

export const authRoute = new AuthRoute();
export const project = new Project();
