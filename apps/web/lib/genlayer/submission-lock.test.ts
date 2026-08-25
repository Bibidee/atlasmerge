import {describe,expect,it} from "vitest";
import {createSubmissionLock} from "./submission-lock";
describe("report submission lock",()=>{
  it("rejects rapid duplicate acquisition until terminal cleanup",()=>{const lock=createSubmissionLock();expect(lock.tryAcquire()).toBe(true);expect(lock.tryAcquire()).toBe(false);expect(lock.isLocked()).toBe(true);lock.release();expect(lock.tryAcquire()).toBe(true);});
  it("allows retry after wallet rejection or rollback cleanup",()=>{const lock=createSubmissionLock();expect(lock.tryAcquire()).toBe(true);lock.release();expect(lock.tryAcquire()).toBe(true);lock.release();expect(lock.isLocked()).toBe(false);});
});
