const getAllTeams = `SELECT 
t.team_name AS name,
CAST(SUM(p.points) AS UNSIGNED) AS totalPoints,
COUNT(*) AS totalGames,
COUNT(CASE
    WHEN p.points = 3 THEN 1
END) AS totalVictories,
COUNT(CASE
    WHEN p.points = 1 THEN 1
END) AS totalDraws,
COUNT(CASE
    WHEN p.points = 0 THEN 1
END) AS totalLosses,
CAST(SUM(p.golFavor) AS UNSIGNED) AS goalsFavor,
CAST(SUM(p.golContra) AS UNSIGNED) AS goalsOwn,
CAST(SUM(p.golFavor) - SUM(p.golContra) AS SIGNED) AS goalsBalance,
ROUND((SUM(p.points) / (COUNT(*) * 3)) * 100,
        2) AS efficiency
FROM
(SELECT 
    m.home_team_id AS team_id,
        CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_goals < m.away_team_goals THEN 0
            ELSE 1
        END AS points,
        m.home_team_goals AS golFavor,
        m.away_team_goals AS golContra
FROM
    TRYBE_FUTEBOL_CLUBE.matches AS m
WHERE
    m.in_progress = 0 UNION ALL SELECT 
    m.away_team_id AS team_id,
        CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_goals < m.home_team_goals THEN 0
            ELSE 1
        END AS points,
        m.away_team_goals AS golFavor,
        m.home_team_goals AS golContra
FROM
    TRYBE_FUTEBOL_CLUBE.matches AS m
WHERE
    m.in_progress = 0) AS p
    JOIN
TRYBE_FUTEBOL_CLUBE.teams AS t ON p.team_id = t.id
GROUP BY t.team_name
ORDER BY totalPoints DESC , totalVictories DESC , goalsBalance DESC , goalsFavor DESC;`;

export default getAllTeams;
