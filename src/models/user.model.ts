import instance from 'utils/axios.utils';

const auth = {
  getUserList: (body: any) => {
    let promise = new Promise((resolve, reject) => {
      instance()
        .post('admin/user_list', body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
  getUser: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = 'admin/user_details';
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
  editUser: (body, id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `user/edit/${id}`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
  deleteuser: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `user/delete/${id}`;
      instance()
        .post(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
};

export default auth;
