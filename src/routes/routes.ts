class User {
  readonly Controller: string = 'robotec-user';
  readonly register: string = 'test';
  readonly Login: string = 'login';
  readonly avatar: string = 'avtor';
  readonly RegisterShop: string = 'registershop';
  readonly EditProfile: string = 'editProfile';
  readonly GetAllUser: string = 'alluser';
}
class Youtube {
  readonly Controller: string = 'youtube';
  readonly CreateYoutube: string = 'createYoutube';
  readonly getCount: string = 'getCount1';
  readonly getAll: string = 'getAllYoutube';
  readonly get: string = 'getYoutube';
}

class Project {
  readonly Controller: string = 'project';
  readonly AddProject: string = 'addproject';
  readonly GetAllProject: string = 'getallproject';
  readonly getCount: string = 'getCount';
  readonly getProject: string = 'getproject';
  readonly editProject: string = 'edit';
  readonly deleteProject: string = 'delete';
}

class Instagram {
  readonly Controller: string = 'insta';
  readonly createInsta: string = 'createInsta';
  readonly getAll: string = 'getAllinst';
  readonly getFollower: string = 'getFollower';
  readonly getFollowing: string = 'getFollowing';
  readonly getInsta: string = 'getInsta';
}

class AuthRoute {
  readonly Controller: string = 'auth';
  readonly Register: string = 'register';
  readonly addInfo: string = 'add/info';
  readonly Login: string = 'login';
  readonly addTask: string = 'task/add';
  readonly getTask: string = 'task/get';
  readonly removeTask: string = 'task/remove';
  readonly taskStatus: string = 'task/status';
  readonly setTaskStatusPending: string = 'task/status/pending';
  readonly updateTask: string = 'task/updates';
  readonly taskCount: string = 'task/count';
  readonly getTaskWithEmail: string = 'task/get/:email';
}

export const authRoute = new AuthRoute();
export const project = new Project();
export const youtube = new Youtube();
export const instagram = new Instagram();
export const user = new User();
