import { IUser } from "../interfaces/user";

export class UserStore {
  private static store: UserStore
  private data: IUser = init

  static getInstance(): UserStore {
      if (!UserStore.store) this.store = new UserStore()
      return this.store;
  }

  get User() { 
    if (!this.data) throw new Error('Error al Ingresar')
    return this.data 
  }
  
  setUser(data: IUser) {
    this.data = data
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user', JSON.stringify(this.data));
      }
    } catch (err) {
      // ignore storage errors
    }
  }

  cleanUser() {
    this.data = init
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('user');
      }
    } catch (err) {}
  }

  isValid() {
    return !!this.data && !!this.data.token && this.data._id !== 'NONE';
  }

  private constructor(){
    // attempt to restore from localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem('user');
        if (raw) {
          const parsed = JSON.parse(raw);
          // basic validation
          if (parsed && parsed._id) {
            this.data = parsed;
          }
        }
      }
    } catch (err) {
      this.data = init;
    }
  }

}

const init = {
  _id: 'NONE',
  //token: 'TOKEN',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjY4ODQwMDA1OWYwODRhMzRjYTc3ZSIsImlhdCI6MTc2NDUzMDk3MSwiZXhwIjoxNzY1MTM1NzcxfQ.85KoosoQsZ2q2C5gpgpRABliwsZicUKP9tCehPtITcQ',
  role: 'NONE',
  username: 'NONE',
  password: 'NONE',
  order: []
}
