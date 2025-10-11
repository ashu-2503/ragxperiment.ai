// src/api/services/dashboard.service.ts
import { httpService } from "../config/httpService";
import { PathConfig } from "../config/PathConfig";

export const dashboardService = {
    /**
     * Fetches counts for dashboard cards (e.g. total knowledgebase files).
     */
    getKnowledgebaseCount: async () => {
        try {
            const response = await httpService.get(PathConfig.DASHBOARD_KNOWLEDGEBASE_COUNT);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
