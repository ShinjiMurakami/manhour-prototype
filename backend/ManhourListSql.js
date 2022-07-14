module.exports.csvsql = `
    SELECT
        t_manhour_list.id                     AS "ID"
        , t_manhour_list.yyyymm               AS "西暦／月"
        , m_user.user_name                    AS "社員名"
        , t_project.project_code              AS "プロジェクトコード"
        , m_product.product_name              AS "プロダクト名"
        , t_project.project_name              AS "プロジェクト名"
        , m_process.process_name              AS "工程"
        , t_manhour_list.hh                   AS "時間／月"
        , t_process_group.process_detail_name AS "工程詳細"
    FROM 
        t_manhour_list
        INNER JOIN m_user ON m_user.id = t_manhour_list.user_id
        INNER JOIN t_project ON t_project.id = t_manhour_list.project_id
        INNER JOIN m_product ON m_product.id = t_project.product_id
        INNER JOIN t_process_group ON t_process_group.id = t_manhour_list.process_group_id
        INNER JOIN m_process ON m_process.id = t_project.process_id
        WHERE
        t_manhour_list.yyyymm LIKE ?
        OR m_user.user_name LIKE ?
        OR t_project.project_code LIKE ?
        OR m_product.product_name LIKE ?
        OR t_project.project_name LIKE ?
        OR m_process.process_name LIKE ?
        OR t_manhour_list.hh LIKE ?
        OR t_process_group.process_detail_name LIKE ?
    ORDER BY
        t_manhour_list.yyyymm
        , m_user.user_name
        , t_project.project_code
;`;

module.exports.getsql = `
SELECT
  t_manhour_list.id
  , t_manhour_list.yyyymm
  , m_user.user_name
  , t_project.project_code
  , m_product.product_name
  , t_project.project_name
  , m_process.process_name
  , t_manhour_list.hh
  , t_process_group.process_detail_name AS process_detail
FROM 
  t_manhour_list
  INNER JOIN m_user ON m_user.id = t_manhour_list.user_id
  INNER JOIN t_project ON t_project.id = t_manhour_list.project_id
  INNER JOIN m_product ON m_product.id = t_project.product_id
  INNER JOIN t_process_group ON t_process_group.id = t_manhour_list.process_group_id
  INNER JOIN m_process ON m_process.id = t_project.process_id
WHERE
  t_manhour_list.yyyymm LIKE ?
  OR m_user.user_name LIKE ?
  OR t_project.project_code LIKE ?
  OR m_product.product_name LIKE ?
  OR t_project.project_name LIKE ?
  OR m_process.process_name LIKE ?
  OR t_manhour_list.hh LIKE ?
  OR t_process_group.process_detail_name LIKE ?
ORDER BY
  t_manhour_list.yyyymm
  , m_user.user_name
  , t_project.project_code
;`;

module.exports.getUser = `
SELECT
  m_user.email
  , m_user.user_name
  , m_user.is_admin_user
FROM
  m_user
WHERE
  is_active = 1
  AND delete_flag = 0
  AND email LIKE ?
;`;