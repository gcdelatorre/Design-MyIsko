import { useEffect, useState } from "react"
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Bell,
  ShieldCheck,
  Sparkles,
  Calendar,
  Search,
  X,
} from "lucide-react"
import { Modal, Button, AiNotice, cx } from "./ui"
import { notifications, aiChecks, extractedFields } from "../lib/data"
import type { Ctx } from "../App"

export type ModalState = null | { type: "upload"; docName?: string } | {
  type: "ai-details"
} | { type: "notifications" } | { type: "compliance"; applicant?: string } | {
  type: "validate"
  applicant?: string
} | { type: "error" }

export function Modals({
  modal,
  onClose,
  ctx,
}: {
  modal: ModalState
  onClose: () => void
  ctx: Ctx
}) {
  if (!modal) return null

  return (
    <>
      {modal.type === "upload" && (
        <UploadModal onClose={onClose} docName={modal.docName} ctx={ctx} />
      )}
      {modal.type === "ai-details" && <AiDetailsModal onClose={onClose} />}
      {modal.type === "notifications" && (
        <NotificationsModal onClose={onClose} ctx={ctx} />
      )}
      {modal.type === "compliance" && (
        <ComplianceModal onClose={onClose} applicant={modal.applicant} />
      )}
      {modal.type === "validate" && (
        <ValidateModal onClose={onClose} applicant={modal.applicant} />
      )}
      {modal.type === "error" && <ErrorModal onClose={onClose} />}
    </>
  )
}

/* Upload with progress + AI analysis simulation */
function UploadModal({
  onClose,
  docName,
  ctx,
}: {
  onClose: () => void
  docName?: string
  ctx: Ctx
}) {
  const [phase, setPhase] =
    useState<"pick" | "uploading" | "analyzing" | "done">("pick")
  const [pct, setPct] = useState(0)

  const start = () => {
    setPhase("uploading")
    let p = 0
    const t = setInterval(() => {
      p += 12
      setPct(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(t)
        setPhase("analyzing")
        setTimeout(() => setPhase("done"), 2200)
      }
    }, 180)
  }

  return (
    <Modal open onClose={onClose} title="Upload Document">
      <div className="p-6">
        <p className="mb-4 text-sm text-ink-soft">
          {docName ? (
            <>
              Uploading for{" "}
              <span className="font-semibold text-ink">{docName}</span>.
            </>
          ) : (
            "Upload your required document."
          )}{" "}
          Accepted: PDF, JPG, PNG · up to 10&nbsp;MB.
        </p>

        {phase === "pick" && (
          <button
            onClick={start}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50 px-6 py-10 text-center transition-colors hover:border-brand-400 hover:bg-brand-100"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm">
              <UploadCloud size={26} />
            </div>
            <p className="text-sm font-semibold text-ink">
              Drag &amp; drop or{" "}
              <span className="text-brand-700">browse files</span>
            </p>
            <p className="text-xs text-ink-soft">
              Your document will be checked automatically after upload.
            </p>
          </button>
        )}

        {phase === "uploading" && (
          <div className="rounded-2xl border border-line bg-canvas p-5">
            <div className="mb-3 flex items-center gap-3">
              <FileText size={22} className="text-brand-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">
                  {docName || "document"}.pdf
                </p>
                <p className="text-xs text-ink-soft">Uploading… {pct}%</p>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-brand-100">
              <div
                className="h-full rounded-full bg-brand-600 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {phase === "analyzing" && (
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white animate-pulse-soft">
              <Sparkles size={26} />
            </div>
            <p className="text-sm font-semibold text-ink">
              Analyzing document…
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Running readability, classification &amp; cross-reference checks.
            </p>
            <div className="mt-4 space-y-1.5 text-left">
              {[
                "Readability check",
                "Document classification",
                "Information extraction",
              ].map((s, i) => (
                <p
                  key={s}
                  className="flex items-center gap-2 text-xs text-ink-soft animate-fade-in"
                  style={{ animationDelay: `${i * 500}ms` }}
                >
                  <CheckCircle2 size={14} className="text-success-500" />
                  {s}
                </p>
              ))}
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="rounded-2xl border border-success-500/30 bg-success-100 p-6 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-success-500 text-white">
              <CheckCircle2 size={26} />
            </div>
            <p className="text-sm font-semibold text-ink">
              Preliminary check complete
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Document uploaded and marked{" "}
              <span className="font-semibold">Ready for Staff Review</span>.
              Final validation is done by ESSO personnel.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {phase === "done" && (
          <Button
            variant="primary"
            onClick={() => {
              onClose()
              ctx.go("app-ai")
            }}
          >
            View AI Result
          </Button>
        )}
      </div>
    </Modal>
  )
}

function AiDetailsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal
      open
      onClose={onClose}
      title="How was this checked?"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 p-6">
        <AiNotice />
        <div className="space-y-2">
          {[
            {
              ok: true,
              t: "Document can be read",
              d: "Scanned resolution is sufficient; text layers are legible.",
            },
            {
              ok: true,
              t: "Document type identified",
              d: "Classified as Certificate of Enrollment.",
            },
            {
              ok: true,
              t: "Required information detected",
              d: "Name, school, program and year level located.",
            },
            {
              ok: true,
              t: "Applicant information compared",
              d: "Cross-referenced with the profile on file.",
            },
            {
              ok: false,
              t: "Potential discrepancy detected",
              d: "School name differs from the profile information.",
            },
          ].map((r) => (
            <div
              key={r.t}
              className={cx(
                "flex items-start gap-3 rounded-xl border p-3.5",
                r.ok
                  ? "border-line bg-white"
                  : "border-warning-500/30 bg-warning-100",
              )}
            >
              {r.ok ? (
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-success-500"
                />
              ) : (
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-warning-600"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-ink">{r.t}</p>
                <p className="text-xs text-ink-soft">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">
            Extracted vs. profile information
          </p>
          <div className="overflow-hidden rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead className="bg-canvas text-left text-xs text-ink-soft">
                <tr>
                  <th className="px-3 py-2 font-semibold">Field</th>
                  <th className="px-3 py-2 font-semibold">Extracted</th>
                  <th className="px-3 py-2 font-semibold">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {extractedFields.map((f) => (
                  <tr key={f.field}>
                    <td className="px-3 py-2 font-medium text-ink">
                      {f.field}
                    </td>
                    <td className="px-3 py-2 text-ink-soft">{f.extracted}</td>
                    <td
                      className={cx(
                        "px-3 py-2",
                        f.match === "near"
                          ? "text-warning-600 font-medium"
                          : "text-ink-soft",
                      )}
                    >
                      {f.profile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="rounded-xl bg-brand-50 px-4 py-3 text-center text-sm font-semibold text-brand-700">
          AI does not determine final eligibility or approval.
        </p>
      </div>
    </Modal>
  )
}

function NotificationsModal({
  onClose,
  ctx,
}: {
  onClose: () => void
  ctx: Ctx
}) {
  const iconMap: Record<string, React.ReactNode> = {
    alert: <AlertTriangle size={18} className="text-warning-600" />,
    search: <Search size={18} className="text-brand-600" />,
    calendar: <Calendar size={18} className="text-info-600" />,
    doc: <FileText size={18} className="text-gold-600" />,
  }
  return (
    <Modal open onClose={onClose} title="Notifications">
      <div className="divide-y divide-line">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cx("flex gap-3 px-6 py-4", n.unread && "bg-brand-50/50")}
          >
            <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-canvas">
              {iconMap[n.icon]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">{n.title}</p>
              <p className="text-xs text-ink-soft">{n.body}</p>
              <p className="mt-1 text-[11px] text-ink-soft/70">{n.time}</p>
            </div>
            {n.unread && (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end border-t border-line px-6 py-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}

function ComplianceModal({
  onClose,
  applicant,
}: {
  onClose: () => void
  applicant?: string
}) {
  const [done, setDone] = useState(false)
  return (
    <Modal open onClose={onClose} title="Request Compliance">
      <div className="p-6">
        {!done ? (
          <>
            <p className="mb-4 text-sm text-ink-soft">
              Send a compliance request to{" "}
              <span className="font-semibold text-ink">
                {applicant || "the applicant"}
              </span>
              . They will be notified to correct or re-upload the document.
            </p>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Document
            </label>
            <select className="mb-4 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200">
              <option>Certificate of Enrollment</option>
              <option>Income Document</option>
              <option>Residency Certificate</option>
            </select>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Reason / instructions
            </label>
            <textarea
              rows={3}
              defaultValue="The school name on your Certificate of Enrollment differs from your profile. Please upload a corrected copy."
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </>
        ) : (
          <div className="rounded-2xl border border-warning-500/30 bg-warning-100 p-6 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-warning-500 text-white">
              <AlertTriangle size={26} />
            </div>
            <p className="text-sm font-semibold text-ink">
              Compliance requested
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Status set to{" "}
              <span className="font-semibold">For Compliance</span> and logged
              to the audit trail.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
        <Button variant="outline" onClick={onClose}>
          {done ? "Close" : "Cancel"}
        </Button>
        {!done && (
          <Button variant="primary" onClick={() => setDone(true)}>
            Send Request
          </Button>
        )}
      </div>
    </Modal>
  )
}

function ValidateModal({
  onClose,
  applicant,
}: {
  onClose: () => void
  applicant?: string
}) {
  const [done, setDone] = useState(false)
  return (
    <Modal open onClose={onClose} title="Confirm Staff Validation">
      <div className="p-6">
        {!done ? (
          <>
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4">
              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-brand-700"
              />
              <p className="text-sm text-brand-900">
                You are recording an{" "}
                <span className="font-semibold">official staff validation</span>{" "}
                for{" "}
                <span className="font-semibold">
                  {applicant || "this applicant"}
                </span>
                . This action is attributed to you and cannot be undone.
              </p>
            </div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Validation note (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Reviewed AI findings. School name discrepancy verified against enrollment record — document is acceptable."
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-line accent-[var(--color-brand-600)]"
                defaultChecked
              />{" "}
              I confirm this decision reflects my own review, not the AI result.
            </label>
          </>
        ) : (
          <div className="rounded-2xl border border-success-500/30 bg-success-100 p-6 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-success-500 text-white">
              <CheckCircle2 size={26} />
            </div>
            <p className="text-sm font-semibold text-ink">
              Document validated by staff
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Marked <span className="font-semibold">Verified</span> ·
              attributed to Spiderman · logged to audit trail.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
        <Button variant="outline" onClick={onClose}>
          {done ? "Close" : "Cancel"}
        </Button>
        {!done && (
          <Button
            variant="primary"
            icon={<ShieldCheck size={16} />}
            onClick={() => setDone(true)}
          >
            Validate Document
          </Button>
        )}
      </div>
    </Modal>
  )
}

function ErrorModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal open onClose={onClose} title="Upload Failed">
      <div className="p-6 text-center">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-danger-100 text-danger-600">
          <X size={28} />
        </div>
        <p className="text-sm font-semibold text-ink">
          We couldn't upload your document.
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Please check your connection and try again.
        </p>
      </div>
      <div className="flex justify-center gap-2 border-t border-line px-6 py-4">
        <Button variant="primary" onClick={onClose}>
          Try Again
        </Button>
      </div>
    </Modal>
  )
}
