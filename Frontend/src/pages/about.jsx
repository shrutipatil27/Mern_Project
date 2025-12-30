import React from "react";

const About = () => {
  return (
    <div className="container my-5" style={{ maxWidth: "1100px" }}>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">About Sunbeam</h2>
        <p className="text-muted mt-2">
          Empowering Careers Through Knowledge, Innovation & Excellence
        </p>
      </div>

      {/* Intro Card */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: "12px" }}
      >
        <div className="card-body p-4">
          <p className="text-muted mb-0">
            At <strong>Sunbeam</strong>, we believe that retaining a competitive
            edge is imperative for individuals in today’s rapidly evolving
            professional world. As organizations continuously restructure and
            reengineer their business processes, professionals must adapt,
            upskill, and innovate to stay ahead.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="row g-4">
        <div className="col-md-6">
          <div
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "12px" }}
          >
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-3 text-primary">
                Industry-Relevant Learning
              </h5>
              <p className="text-muted">
                In today’s competitive landscape, technical expertise and
                personal skills that deliver effective, time-critical solutions
                are essential for long-term career growth. Sunbeam specializes
                in delivering high-quality training and solutions that align
                with real-world industry demands.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "12px" }}
          >
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-3 text-primary">
                Proven Track Record
              </h5>
              <p className="text-muted">
                Sunbeam’s success is backed by a deep understanding of rapidly
                changing technologies, global business trends, and industry
                needs. Our innovative training methodologies and effective use
                of technology ensure meaningful and lasting transformations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div
        className="card border-0 shadow-sm my-4"
        style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}
      >
        <div className="card-body p-4">
          <h5 className="fw-semibold mb-3 text-primary">
            Our Vision & Growth
          </h5>
          <p className="text-muted mb-0">
            Driven by a young and dynamic management team and supported by
            carefully recruited and trained faculty, Sunbeam has established
            strong credentials in a short span of time. Since its humble
            beginnings in the late 1990s, Sunbeam Group has evolved into a
            multi-technology, multi-location competency center.
          </p>
        </div>
      </div>

      {/* Closing Section */}
      <div className="text-center mt-5">
        <h5 className="fw-semibold mb-3">
          A Trusted Partner in Career Growth
        </h5>
        <p className="text-muted">
          Today, Sunbeam Group stands as a premium turnkey solution provider,
          delivering high-end IT training and solutions through diverse learning
          modes. Our commitment to excellence, innovation, and continuous
          learning continues to shape future-ready professionals.
        </p>
      </div>
    </div>
  );
};

export default About;
