import type { Work } from "@/types/domain";
import GridContainer from "@/components/grids/grid-container";
import GridFour from "@/components/grids/grid-four";
import ScrollReveal from "@/components/scroll-reveal";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Locale } from "@/lib/i18n";

interface WorkMetaProps {
  client?: Work["client"];
  campaign?: Work["campaign"];
  country?: Work["country"];
  creative?: Work["creative"];
  strategy?: Work["strategy"];
  lead_design?: Work["lead_design"];
  design?: Work["design"];
  copy?: Work["copy"];
  illustration?: Work["illustration"];
  animation?: Work["animation"];
  photo?: Work["photo"];
  develop?: Work["develop"];
  work_team?: Work["work_team"];
  disciplines?: Work["disciplines"] | string | null;
}

export default function WorkMeta({
  client,
  campaign,
  country,
  creative,
  strategy,
  lead_design,
  design,
  copy,
  illustration,
  animation,
  photo,
  develop,
  work_team,
  disciplines,
  locale,
}: WorkMetaProps & { locale: Locale }) {
  const labels = locale === "es"
    ? ["Cliente", "Campaña", "País", "Creatividad", "Estrategia", "Liderazgo", "Diseño", "Copy", "Ilustración", "Animación", "Foto", "Desarrollo", "Equipo", "Disciplinas"]
    : ["Client", "Campaign", "Country", "Creative", "Strategy", "Lead", "Design", "Copy", "Illustration", "Animation", "Photo", "Develop", "Team", "Disciplines"];
  const items = [
    { label: labels[0], value: client },
    { label: labels[1], value: campaign },
    { label: labels[2], value: country },
    { label: labels[3], value: creative },
    { label: labels[4], value: strategy },
    { label: labels[5], value: lead_design },
    { label: labels[6], value: design },
    { label: labels[7], value: copy },
    { label: labels[8], value: illustration },
    { label: labels[9], value: animation },
    { label: labels[10], value: photo },
    { label: labels[11], value: develop },
    { label: labels[12], value: work_team },
    {
      label: labels[13],
      value: Array.isArray(disciplines)
        ? disciplines.map((d) => d.title).join(", ")
        : disciplines,
    },
  ].filter((item) => item.value);

  if (items.length === 0) {
    return null;
  }

  return (
    <GridContainer className="my-0">
      <GridFour />
      <GridFour>
        <ScrollReveal className="col-span-full mt-4 mb-8">
          <Table>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.label}
                  className="group-data-[variant=yellow]:hover:bg-muted/10 group-data-[variant=light]:hover:bg-muted/10"
                >
                  <TableCell className="py-4 font-bold uppercase">
                    {item.label}
                  </TableCell>
                  <TableCell className="py-4">{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollReveal>
      </GridFour>
    </GridContainer>
  );
}
