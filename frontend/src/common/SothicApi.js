const API = 'http://localhost:8080/api'

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
        url: `${API}/project-upload`,
        method: 'POST'
    },
    all_project: {
        url: `${API}/all-projects`,
        method: 'GET'
    },
    project_update: {
        url: `${API}/project-update`,
        method: 'POST'
    },
    project_by_category: {
        url: `${API}/projects-by-category`,
        method: 'POST'
    },
    project_details: {
        url: `${API}/project-details`,
        method: 'POST'
    },
    news_upload: {
        url: `${API}/upload-news`,
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
    }
}

export default SothicAPI