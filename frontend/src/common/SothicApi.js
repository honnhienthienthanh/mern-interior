const API = `${process.env.REACT_APP_BACKEND_URI}/api`

const SothicAPI = {
    register: {
        url: `${API}/register`,
        method: 'POST'
    },
    login: {
        url: `${API}/login`,
        method: 'POST'
    },
    current_user: {
        url: `${API}/user-details`,
        method: 'GET'
    },
    is_admin: {
        url: `${API}/is-admin`,
        method: 'GET'
    },
    logout: {
        url: `${API}/logout`,
        method: 'GET'
    },
    get_all_users: {
        url: `${API}/get-all-users`,
        method: 'GET'
    },
    update_user_role: {
        url: `${API}/update-user-role`,
        method: 'POST'
    },
    project_upload: {
        url: `${API}/add-new-project`,
        method: 'POST'
    },
    all_project: {
        url: `${API}/list-projects`,
        method: 'GET'
    },
    project_update: {
        url: `${API}/update-project`,
        method: 'POST'
    },
    project_delete: {
        url: `${API}/remove-project`,
        method: 'POST'
    },
    project_by_category: {
        url: `${API}/projects-by-category`,
        method: 'POST'
    },
    project_details: {
        url: `${API}/details-project`,
        method: 'POST'
    },
    news_upload: {
        url: `${API}/add-new-news`,
        method: 'POST'
    },
    news_get_all: {
        url: `${API}/get-all-news`,
        method: 'GET'
    },
    news_details: {
        url: `${API}/news-details`,
        method: 'POST'
    },
    news_update: {
        url: `${API}/update-news`,
        method: 'POST'
    },
    news_delete: {
        url: `${API}/delete-news`,
        method: 'POST'
    },
    careers_get_all: {
        url: `${API}/get-all-careers`,
        method: 'POST'
    },
    careers_upload: {
        url: `${API}/upload-careers`,
        method: 'POST'
    },
    careers_edit: {
        url: `${API}/update-careers`,
        method: 'POST'
    },
    careers_details: {
        url: `${API}/careers-details`,
        method: 'POST'
    },
    careers_delete: {
        url: `${API}/delete-career`,
        method: 'POST'
    },
    contact_post: {
        url: `${API}/post-contact`,
        method: 'POST'
    },
    design_req: {
        url: `${API}/design-req`,
        method: 'POST'
    },
    design_req_get: {
        url: `${API}/get-design-req`,
        method: 'GET'
    },
    design_req_delete: {
        url: `${API}/delete-design-req`,
        method: 'POST'
    },
    home_slide_upload: {
        url: `${API}/upload-slide`,
        method: 'POST'
    },
    home_get_slide: {
        url: `${API}/get-slide`,
        method: 'GET'
    },
    home_update: {
        url: `${API}/slide-update`,
        method: 'POST'
    },
    home_delete: {
        url: `${API}/slide-delete`,
        method: 'POST'
    },
    contact_add: {
        url: `${API}/add-contact`,
        method: 'POST'
    },
    subscribe_email: {
        url: `${API}/send-subscribe`,
        method: 'POST'
    }
}

export default SothicAPI