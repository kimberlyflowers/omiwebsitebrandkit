import GalleryPage from "@/components/GalleryPage";

export const metadata = { title: "YES — Youth Empowerment School" };

export default function YES() {
  return (
    <GalleryPage
      eyebrow="YES · Youth Empowerment School"
      title="Lead. Serve. Rise."
      lede="YES is where the next generation is formed into servant-leaders ready for the moment. Faith, voice, and vision — cultivated together, year-round, across age groups."
      externalLink={{ label: "Visit Youth Empowerment School", href: "https://youthempowermentschool.live" }}
      heroCaption="YES students in action"
      featured={{
        title: "YES Rise Up — the summer cohort",
        body: "Our flagship summer intensive for high school students. Two weeks of leadership training, service projects, and formation. Culminates in a commissioning weekend.",
        caption: "Rise Up graduation photo",
        cta: { label: "Learn about Rise Up", href: "/contact" },
      }}
      items={[
        { title: "Leadership track", meta: "YES · Leadership", body: "Monthly cohorts for students ready to lead their peers.", caption: "Leadership circle photo" },
        { title: "Service track", meta: "YES · Service", body: "Hands-on community service, mentored weekly.", caption: "Service day photo" },
        { title: "Creative arts track", meta: "YES · Creative", body: "Worship, media, design — creative gifts put to kingdom use.", caption: "Creative arts photo" },
        { title: "Mentor nights", meta: "Weekly", body: "1:1 mentorship pairings and group discussion.", caption: "Mentor night photo" },
        { title: "Rise Up summer", meta: "Summer intensive", body: "Two-week leadership cohort every July.", caption: "Rise Up photo" },
        { title: "Parent gatherings", meta: "Quarterly", body: "Built with the Empowerment Center Network.", caption: "Parent gathering photo" },
      ]}
    />
  );
}
