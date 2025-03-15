// User interface
export interface User {
  id: number;
  name: string;
  screen_name: string;
  avatar_file_path?: string;
  birth_date?: string;
  bio?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// TestRecord interface
export interface TestRecord {
  id: number;
  user_id: number;
  test_date: string;
  file_path?: string;
  file_type?: string;
  file_metadata?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  results: TestResult[];
}

// TestResult interface
export interface TestResult {
  id: number;
  test_record_id: number;
  test_type: string;
  result: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  test_date?: string;
  record_id?: number;
}

// TestingReminder interface
export interface TestingReminder {
  id: number;
  user_id: number;
  frequency: string;
  next_test_date: string;
  last_notified_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ShareResult interface
export interface ShareResult {
  screen_name: string;
  results: TestResult[];
}

// For file upload
export interface UploadedFile {
  fileName: string;
  fileSize: number;
}

export interface UploadStatus {
  stage: "idle" | "uploading" | "processing" | "complete" | "error";
  progress: number;
  currentFile: string | null;
  processedFiles: string[];
}
