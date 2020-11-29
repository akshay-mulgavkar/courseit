let endpoint;

endpoint = "http://localhost:3010/api";
const hostname = window && window.location && window.location.hostname;

export default {
    hostname,
    log_in: endpoint + '/users/login/admin',

    get_all_courses : endpoint + '/courses/all',
    add_new_course : endpoint + '/courses',
    edit_course : endpoint + '/courses',
    delete_course : endpoint + '/courses',

    get_all_topics : endpoint + '/topics/all',
    add_new_topic : endpoint + '/topics',
    edit_topic : endpoint + '/topics',
    delete_topic : endpoint + '/topics',
}
